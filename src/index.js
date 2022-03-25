import './style.css';

import Awesome from './modules/classAwesome.js';

const enter = document.querySelector('.enter');
const tasks = document.querySelector('#tasks');
const awesome = new Awesome();
document.addEventListener('DOMContentLoaded', () => awesome.returnInfo());

enter.addEventListener('click', (e) => {
  e.preventDefault();
  const chore = document.getElementById('myInput').value;
  if (!chore) {
    alert('missing information');
  } else {
    awesome.addRecord(chore);
    awesome.local();
    document.getElementById('myInput').value = '';
  }
});

tasks.addEventListener('focusout', (e) => {
  const item = e.target.value;
  awesome.updateInput(item, e.path[0].defaultValue);
  awesome.local();
});

tasks.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.innerHTML === '  ') {
    awesome.eliminate(e.path[0].defaultValue);
  }
});