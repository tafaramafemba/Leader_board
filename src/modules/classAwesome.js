export default class Awesome {
  constructor() {
    this.data = {};
    this.record = [];
    this.completed = false;
    this.count = 0;
  }
  
  addRecord(chore) {
    this.count +=1;
    this.data = { chore, completed: false, index: this.count };
    this.record.push(this.data);
    return this.data;
  }

  updateIndex() {
    this.record = JSON.parse(localStorage.getItem('tasks'));
    let i = -1;
    for (let j = 0; j < this.record.length; j += 1) {
      i +=1;
      this.count = i;
      this.record[j].index = this.count;
    }
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
    } else {
      this.record.forEach((element) => {
        tasks.innerHTML += `
        <div id = "organize">
        <input type="checkbox">
        <input type = "text" class = "label-input" value = "${element.chore}">
        <button class = "li-btn">  </button>
        </div>
        `;
      });
    }
  }

  eliminate(chore) {
    this.updateIndex();
    this.record.splice(chore, 1);
    this.local();
  }
}