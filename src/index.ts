/**
 * Install-typescript-procces.
 *  typescript install ( npx create-snowpack-app . --template @snowpack/app-template-blank-typescript --force)
 *import { v4 as uuidV4 } from 'uuid';
 * uuidV4();
 *
 * **/
// console.log('hassel');
import { v4 as uuidV4 } from 'uuid';
// uuidV4();

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>('#list_area');
const form = document.getElementById('#task_form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#task_title');
const tasks: Task[] = loadTasks();
tasks.forEach(addlistItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  addlistItem(newTask);
  input.value = '';
});

function addlistItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
