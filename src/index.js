import './style.css';
import { createGame, getUsersData, createUserData } from './modules/api.js'

const refreshButton = document.querySelector('.refresh');

const loadScores = async () => {
  const scoresDisplay = document.getElementsByClassName('scoreboard');

  while (scoresDisplay.firstChild) {
    scoresDisplay.removeChild(scoresDisplay.firstChild);
  }

  const usersData = await getUsersData();

  usersData.result.forEach((entry) => scoresDisplay.insertAdjacentHTML('beforeend', `
    <div>${entry.user}: ${entry.score}</div>  
  `));
};

refreshButton.addEventListener('click', loadScores);

const userDataSubmit = document.querySelector('#add');

userDataSubmit.addEventListener('click', async () => {
  let userName = document.getElementById('new-name').value;
  let userScore = document.getElementById('new-score').value;

  if (userName !== '' && userScore !== '') {
    const data = {
      user: userName,
      score: userScore,
    };

    await createUserData(data);

    userName = '';
    userScore = '';
  }
  loadScores();
});

document.addEventListener('DOMContentLoaded', () => {
  createGame(`Game created at: ${new Date()}`);
  loadScores();
});