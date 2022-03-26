import { forEach } from "lodash";

export default class Awesome {
  constructor() {
    this.data = {};
    this.record = [];
    this.completed = false;
    this.count = 0;
  }

  addListenerToDelete(choreEle) {
    const binEle = choreEle.querySelector('.li-btn');

    binEle.addEventListener('click', (e) => {
      e.preventDefault();
      this.eliminate(choreEle.id - 1);
    });
  }

  addRecord(chore) {
    this.count += 1;
    this.data = { chore, completed: false, index: this.count };
    this.record.push(this.data);
    return this.data;
  }

  updateIndex() {
    this.record = JSON.parse(localStorage.getItem('tasks'));
    if (!this.record?.length) {
      this.count = 0;
      return;
    }
    this.record.forEach((chore, i) => {
      this.count = i + 1;
      chore.index = this.count;
    });
    localStorage.setItem('tasks', JSON.stringify(this.record));
  }

  local() {
    localStorage.setItem('tasks', JSON.stringify(this.record));
    this.returnInfo();
  }

  updateInput(value, element) {
    this.record = JSON.parse(localStorage.getItem('tasks'));
    this.record.forEach((elementForChore) => {
      if (elementForChore.chore === element) {
        elementForChore.chore = value;
      }
      localStorage.setItem('tasks', JSON.stringify(this.record));
    });
  }

  returnInfo() {
    const tasks = document.querySelector('#tasks');
    tasks.innerHTML = '';
    this.record = JSON.parse(localStorage.getItem('tasks'));
    if (this.record === null) {
      this.record = [];
      this.count = 0;
    } else {
      // get new count
      this.count = 0;
      this.record.forEach((element) => {
        this.count += 1;
        const newChoreEle = document.createElement('div');
        newChoreEle.classList.add('organize');
        newChoreEle.id = `${this.count}`;

        if (element.completed === true) {
          newChoreEle.innerHTML = `
        <input type="checkbox" id="${this.count}" class="check-btn">
        <input type="text" class="checked-check-btn" data-id="${this.count}" value="${element.chore}">
        <button id="btn-${this.count}" class="li-btn">  </button>
        `;
        } else {
          newChoreEle.innerHTML = `
        <input type="checkbox" id="${this.count}" class="check-btn">
        <input type="text" class="label-input" data-id="${this.count}" value="${element.chore}">
        <button id="btn-${this.count}" class="li-btn">  </button>
        `;
        }

        document.querySelector('#tasks').appendChild(newChoreEle);
        this.addListenerToDelete(newChoreEle);
        this.changeCheck(newChoreEle, element);
        localStorage.setItem('tasks', JSON.stringify(this.record));
      });
    }
  };

  eliminate(choreElem) {
    // 1. removing the object from the array
    this.record.splice(choreElem, 1);
    localStorage.setItem('tasks', JSON.stringify(this.record));
    this.updateIndex();
    this.returnInfo();
  }


  changeCheck(newchoreEle) {
    this.record = JSON.parse(localStorage.getItem('tasks'));
    const checkBtn = newchoreEle.querySelector('.check-btn');
    const indexOfChore = newchoreEle.id - 1;

    checkBtn.addEventListener('change', (e) => {
      e.preventDefault();
      //checks to see if item clicked was completed or not and sets it to the opposite
      if (this.record[indexOfChore].completed === false) {
        this.completed = true;
        this.record[indexOfChore].completed = true;
        localStorage.setItem('tasks', JSON.stringify(this.record));
      }
      else {
        this.completed = false;
        this.record[indexOfChore].completed = false;
        localStorage.setItem('tasks', JSON.stringify(this.record));
        this.returnInfo();
      }
    });


  }

  clearCompleted() {
    this.record = JSON.parse(localStorage.getItem('tasks'));
    this.record = this.record.filter(element => element.completed === false);
    const clearItems = this.record.filter(element => !element.completed);
    localStorage.setItem('tasks', JSON.stringify(this.record));
    this.returnInfo();
  }
}