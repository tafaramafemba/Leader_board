export default class Awesome {
  constructor() {
    this.data = {};
    this.record = [];
  }

  addRecord(chore) {
    this.data = { chore };
    this.record.push(this.data);
    return this.data;
  }

  removeRecord(rec) {
    let result = this.record.filter(el => el === rec);
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
    tasks.innerHTML = '';
    this.record = JSON.parse(localStorage.getItem('tasks'));
    if (this.record === null) {
      this.record = [];
    } else {
      let index = 0;
      this.record.forEach((element) => {
        index += 1;
        tasks.innerHTML += `
        <div id = "organize"${index}>
        <input type="checkbox">
        <input type = "text" class = "label-input" value = "${element.chore}">
        <button class = "li-btn">  </button>
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



// https://github.com/hsztan/minimalist-todo-list/tree/tasks-status
