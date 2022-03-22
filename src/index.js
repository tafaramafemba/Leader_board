import './style.css';

const taskObject = [
   {
    chore: 'wash the dishes',
    completed: true,
    index: 1,
  },

  {
    chore: 'complete To Do list project',
    completed: false,
    index: 2,
  },
  ];

const tasks = document.querySelector('.tasks');
const ul = document.createElement('ul');
ul.classList.add('tasks-list');
tasks.appendChild(ul);

function displayTasks(theObject) {
  for (let i = 0; i <= theObject.length; i += 1) {
    const li = document.createElement('li');
    li.classList.add('tasks-li');
    li.innerHTML = `
    <button class = "check-btn"></button>
    <div class = "label-div"><label>${theObject[i].chore}</label></div>
    <button class = "li-btn"></button>
    `;
    ul.appendChild(li);
  }
}

displayTasks(taskObject);