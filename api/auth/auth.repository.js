import userModel from '../users/users.model.js';

export async function create({ username, hashedPassword }) {
  try {
    const newUser = await userModel.create({ username, password: hashedPassword });
    return newUser;
  } catch (err) {
    const myError = {
      err: '401',
      message: 'Wrong credentials 2',
    };
    return myError;
  }
}

export async function login({ username }) {
  try {
    const loggedUser = await userModel.find({ username }).lean();
    return loggedUser;
  } catch (err) {
    const myError = {
      err: '401',
      message: 'Wrong credentials 2',
    };
    return myError;
  }
}
