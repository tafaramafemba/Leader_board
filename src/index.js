import './style.css';
const enter = document.querySelector('.enter');
const tasks = document.querySelector('.tasks');
const liButton = document.querySelector('.li-btn');
const input = document.querySelector('.myInput');
const ul = document.createElement('ul');
ul.classList.add('tasks-list');
tasks.appendChild(ul);

// CLASS //
class Awesome {
  constructor() {
    this.data = {};
    this.record = [];
  }

  addRecord(chore) {
    this.data = { chore };
    this.record.push(this.data);
    return this.data;
  }

  local() {
    localStorage.setItem('tasks', JSON.stringify(this.record));
    this.returnInfo();
  }

  returnInfo() {
    tasks.innerHTML = '';
    this.record = JSON.parse(localStorage.getItem('tasks'));
    if (this.record === null) {
      this.record = [];
    } else {
      let count = 0;
      this.record.forEach((element) => {
        count += 1;

        tasks.innerHTML += `
        <div class = "organize">
        <button class = "check-btn"></button>
        <input type = "text" class = "label-input" value = "${element.chore}">
        <button class = "li-btn"></button>
        </div>
        `;
      });
    }
  }

  eliminate(chore) {
    let indexArray;
    this.record.forEach((element, index) => {
      if (element.chore === chore) {
        indexArray = index;
      }
    });
    this.record.splice(indexArray, 1);
    this.local();
  }
}

const awesome = new Awesome();

// EVEN LISTENERS //
enter.addEventListener('click', (e) => {
  e.preventDefault();
  const chore = document.getElementById('myInput').value;
  if (chore === '') {
    alert('missing information');
  } else {
    awesome.addRecord(chore);
    awesome.local();
    document.getElementById('myInput').value = '';
  }
});

liButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.innerHTML === 'Remove') {
    const eliminateChore = e.path[1].childNodes[1].childNodes[0].data;
    awesome.eliminate(eliminateChore);
  }
});

input.oninput = function() {
  awesome.addRecord(chore);
  awesome.local();
};

document.addEventListener('DOMContentLoaded', awesome.returnInfo());