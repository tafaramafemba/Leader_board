import './style.css';
const scoreboard = document.querySelector('.scoreboard');

const data = [
  {
    name: ['Tafara', 'Tom', 'Brady'],
    score: [100, 200, 400],
  },
];

for (let i = 0; i < 3; i += 1) {
  scoreboard.innerHTML = `

<div class = "board">
<p class = "d-name">${data[0].name[0]}</p>
<p class = "d-name">${data[0].score[0]}</p>

</div>
`;
}