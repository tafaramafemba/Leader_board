import './style.css';

import Awesome from './modules/classAwesome.js';

const enter = document.querySelector('.enter');

const awesome = new Awesome();

const addListenerOnFocus = (chores) => {
  chores.addEventListener('focusout', (e) => {
    const item = e.target.value;
    awesome.updateInput(item, e.path[0].defaultValue);
    awesome.local();
  });
};

// Main load
document.addEventListener('DOMContentLoaded', () => {
  awesome.returnInfo();
  const chores = document.querySelectorAll('.label-input');
  chores.forEach((chore) => addListenerOnFocus(chore));
});

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