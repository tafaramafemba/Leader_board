import './style.css';
import Awesome from './modules/classAwesome';
const enter = document.querySelector('.enter');
const tasks = document.querySelector('#tasks');
const liButton = document.querySelector('.li-btn');
const input = document.querySelector('.myInput');
const awesome = new Awesome();

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

tasks.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.innerHTML === '  ') {
    awesome.eliminate(e.path[0].defaultValue);
  }

});

document.addEventListener('DOMContentLoaded', awesome.returnInfo());