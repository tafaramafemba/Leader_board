import './style.css';
import { getUsersData, createUserData } from './modules/api.js';

const refreshButton = document.querySelector('.refresh');

const loadScores = async () => {
  const scoresDisplay = document.querySelector('.scoreboard');

  while (scoresDisplay.firstChild) {
    scoresDisplay.removeChild(scoresDisplay.firstChild);
  }

  const usersData = await getUsersData();

  usersData.result.forEach((entry) => scoresDisplay.insertAdjacentHTML('beforeend', `
    <div>${entry.user}: ${entry.score}</div>  
  `));
};

refreshButton.addEventListener('click', loadScores);

const userDataSubmit = document.querySelector('#form');

userDataSubmit.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userName = document.getElementById('new-name');
  const userScore = document.getElementById('new-score');

  if (userName.value !== '' && userScore.value !== '') {
    const data = {
      user: userName.value,
      score: userScore.value,
    };

    await createUserData(data);

    userName.value = '';
    userScore.value = '';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // createGame(`Game created at: ${new Date()}`);
  loadScores();
});