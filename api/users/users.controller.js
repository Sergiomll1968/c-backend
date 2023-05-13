import * as usersService from './users.service.js';

export async function getAllActive(req, res) {
  const activeUsers = await usersService.getAllActive();
  res.json(activeUsers);
}

export async function getById(req, res) {
  const { id } = req.params;
  const userById = await usersService.getById({ id });
  res.json(userById);
}

export async function getBoss(req, res) {
  const { id } = req.params;
  const boss = await usersService.getBoss({ id });
  res.json(boss);
}

export async function create(req, res) {
  // const { userDataToValidate } = req.body;
  const userDataValidated = req.body;
  const newUser = await usersService.create({ userDataValidated });
  res.json(newUser);
}

export function replace(req, res) {
  const { id } = req.params;
  const userDataToValidate = req.body;
  const userDataValidated = userDataToValidate;
  const replacedUser = usersService.replace(id, userDataValidated);
  res.json(replacedUser);
}

export function update(req, res) {
  const { id } = req.params;
  const userDataToValidate = req.body;
  const userDataValidated = userDataToValidate;
  const updatedUser = usersService.update(id, userDataValidated);
  res.json(updatedUser);
}

export function logicDelete(req, res) {
  const { id } = req.params;
  const activeUsers = usersService.logicDelete(id);
  res.json(activeUsers);
}

export function hardDelete(req, res) {
  const { id } = req.params;
  const activeUsers = usersService.hardDelete(id);
  res.json(activeUsers);
}
