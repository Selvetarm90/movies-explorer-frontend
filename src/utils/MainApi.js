const BASE_URL = 'https://api.paramonov.movieexplorer.nomoredomains.sbs';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
};

export const updateUserInfo = (token, data) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: data.name, email: data.email }),
  }).then(checkResponse);
};

export const addMovie = (data, token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const delMovie = (id, token) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
};
