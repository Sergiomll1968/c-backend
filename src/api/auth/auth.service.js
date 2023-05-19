import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import * as usersRepository from '../users/users.repository.js';

function getToken({ username }) {
  const payload = {
    username,
  };

  const token = jwt.sign(payload, 'secretWord', {
    expiresIn: 60 * 60, // in secs
  });

  return token;
}

export async function register({ username, password }) {
  const hashedPassword = hashSync(password, 10);
  const dbUser = await usersRepository.create({ username, password: hashedPassword });
  if (!dbUser) {
    const myError = {
      status: 500,
      message: 'Some problem creating the user',
    };

    throw new Error(JSON.stringify(myError));
  }

  const token = getToken({ username: dbUser.username });
  if (!token) {
    const myError = {
      status: 500,
      message: 'Some problem generating token',
    };

    throw new Error(JSON.stringify(myError));
  }

  return token;
}

export async function login({ username, password }) {
  const loggedUser = await usersRepository.getByUsername({ username });
  if (!loggedUser) {
    const myError = {
      status: 401,
      message: 'Wrong credentials 2',
    };
    throw new Error(JSON.stringify(myError));
  }

  const isAuthorized = compareSync(password, loggedUser.password);

  if (!isAuthorized) {
    const myError = {
      status: 401,
      message: 'Wrong credentials 2',
    };
    throw new Error(JSON.stringify(myError));
  }

  const token = getToken({ username: loggedUser.username });
  if (!token) {
    const myError = {
      status: 500,
      message: 'Some problem generating token',
    };

    throw new Error(JSON.stringify(myError));
  }

  return token;
}
