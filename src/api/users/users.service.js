import * as usersRepository from './users.repository.js';

export async function getAllActive() {
  const activeUsers = await usersRepository.getAllActive();
  return activeUsers;
}

export async function getAllLength() {
  const usersLength = await usersRepository.getAllLength();
  return usersLength;
}

export async function getRandom() {
  const length = await usersRepository.getAllLength();
  const index = length - 1; // seria llamar a funcion getrandom
  const randomUser = await usersRepository.getByIndex(index);
  return randomUser;
}

export async function getByUsername({ username }) {
  const user = await usersRepository.getByUsername({ username });
  return user;
}

export async function getById({ id }) {
  const userById = await usersRepository.getById({ id });
  return userById;
}

export async function getByFilter({ filter }) {
  const filteredUsers = await usersRepository.getByFilter({ filter });
  return filteredUsers;
}

export async function getBoss({ id }) {
  const boss = await usersRepository.getBoss({ id });
  return boss;
}

export async function create({ userDataValidated }) {
  const newUser = await usersRepository.create({ userDataValidated });
  return newUser;
}

export async function replace({ id, userDataValidated }) {
  const replacedUser = await usersRepository.replace({ id, userDataValidated });
  return replacedUser;
}

export async function update({ id, userDataValidated }) {
  const updatedUser = await usersRepository.update({ id, userDataValidated });
  return updatedUser;
}

export async function logicDelete({ id }) {
  const activeUsers = await usersRepository.logicDelete({ id });
  return activeUsers;
}

export async function hardDelete({ id }) {
  const activeUsers = await usersRepository.hardDelete({ id });
  return activeUsers;
}
