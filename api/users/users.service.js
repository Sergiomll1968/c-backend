import * as usersRepository from './users.repository.js';

export async function getAllActive() {
  const activeUsers = await usersRepository.getAllActive();
  return activeUsers;
};

export async function getById({ id }) {
  const userById = await usersRepository.getById({ id });
  return userById;
};

export function getBoss(id) {
  const boss = usersRepository.getBoss(id);
  return boss;
};

export function create(userDataValidated) {
  const newUser = usersRepository.addNew(userDataValidated);
  return newUser;
};

export function replace(id, userDataValidated) {
  const replacedUser = usersRepository.replace(id, userDataValidated);
  return replacedUser;
};

export function update(id, userDataValidated) {
  const updatedUser = usersRepository.update(id, userDataValidated);
  return updatedUser;
};

export function logicDelete(id) {
  const activeUsers = usersRepository.logicDelete(id);
  return activeUsers;
};

export function hardDelete(id) {
  const activeUsers = usersRepository.hardDelete(id);
  return activeUsers;
};
