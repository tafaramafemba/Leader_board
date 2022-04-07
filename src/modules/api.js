const apiBaseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const gameId = 'oqFojossPKuv8cC62qK4';

const createGame = async (name) => {
  const response = await fetch(apiBaseUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(`{name: ${name}}`),
  });

  const res = await response.json();
  return res;
};

const createUserData = async (data) => {
  const response = await fetch(`${apiBaseUrl}${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  return res;
};

const getUsersData = async () => {
  const response = await fetch(`${apiBaseUrl}${gameId}/scores/`);

  const usersData = await response.json();
  return usersData;
};

export { createGame, createUserData, getUsersData };