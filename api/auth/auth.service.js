import { hashSync, compareSync } from 'bcrypt';
import * as authRepository from './auth.repository.js';

function getToken(username) {
  return `${username}-Token`;
}

export async function register({ username, password }) {
  const hashedPassword = hashSync(password, 10);
  let token;

  try {
    const newUser = await authRepository.create({ username, hashedPassword });
    token = getToken(newUser.username);
  } catch (err) {
    return (err);
  }
  return (token);
}

export async function login({ username, password }) {
  const hashedPassword = hashSync(password, 10);
  let token;

  try {
    const loggedUser = await authRepository.login({ username });
    if (!loggedUser) {
      const myError = {
        err: '401',
        message: 'Wrong credentials 2',
      };
      return myError;
    }
    token = getToken(loggedUser.username);
  } catch (err) {
    return (err);
  }
  return (token);
}
