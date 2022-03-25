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
      console.log(choreEle);
      this.eliminate(choreEle);
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
        newChoreEle.id = `chore-${this.count}`;
        newChoreEle.innerHTML = `
        <input type="checkbox">
        <input type="text" class="label-input" data-id="${this.count}" value="${element.chore}">
        <button id="btn-${this.count}" class="li-btn">  </button>
        `;
        console.log('item created');
        this.addListenerToDelete(newChoreEle);

        document.querySelector('#tasks').appendChild(newChoreEle);
      });
    }
  }

  eliminate(choreElem) {
    // get the index on the record array of the chore
    const indexOfChore = choreElem.querySelector('.label-input').dataset.id;
    // 1. removing the object from the array
    console.log('index of chore', indexOfChore);
    this.record.splice(indexOfChore - 1, 1);
    localStorage.setItem('tasks', JSON.stringify(this.record));
    this.updateIndex();
    this.returnInfo();
  }
}