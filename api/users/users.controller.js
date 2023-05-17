import * as usersService from './users.service.js';

export async function getAllActive(req, res) {
  const activeUsers = await usersService.getAllActive();
  res.json(activeUsers);
}

export async function getAllLength(req, res) {
  const usersLength = await usersService.getAllLength();
  res.json(usersLength);
}

export async function getRandom(req, res) {
  const randomUser = await usersService.getRandom();
  res.json(randomUser);
}

export async function getById(req, res) {
  const id = req.params;
  const userById = await usersService.getById({ id });
  res.json(userById);
}

export async function getByFilter(req, res) {
  const filter = req.query;
  const filteredUsers = await usersService.getByFilter({ filter });
  res.json(filteredUsers);
}

export async function getBoss(req, res) {
  const id = req.params;
  const boss = await usersService.getBoss({ id });
  res.json(boss);
}

export async function create(req, res) {
  const userDataToValidate = req.body;
  const userDataValidated = userDataToValidate;
  const newUser = await usersService.create({ userDataValidated });
  res.json(newUser);
}

export async function replace(req, res) {
  const { id } = req.params;
  const userDataToValidate = req.body;
  const userDataValidated = userDataToValidate;
  const replacedUser = await usersService.replace({ id, userDataValidated });
  res.json(replacedUser);
}

export async function update(req, res) {
  const { id } = req.params;
  const userDataToValidate = req.body;
  const userDataValidated = userDataToValidate;
  const updatedUser = await usersService.update({ id, userDataValidated });
  res.json(updatedUser);
}

export async function logicDelete(req, res) {
  const { id } = req.params;
  const activeUsers = await usersService.logicDelete({ id });
  res.json(activeUsers);
}

export async function hardDelete(req, res) {
  const { id } = req.params;
  const activeUsers = await usersService.hardDelete({ id });
  res.json(activeUsers);
}
