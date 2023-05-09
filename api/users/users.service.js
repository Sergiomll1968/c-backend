import * as usersRepository from './users.repository.js';

export function getAll(req, res) {
  usersRepository.getAll(req, res);
};

export function getId(id, res) {
  usersRepository.getId(id, res);
};

export function getBoss(id, res) {
  usersRepository.getBoss(id, res);
};

export function addNew(req, res) {
  usersRepository.addNew(req, res);
};

export function replace(id, userDataToValidate, res) {
  usersRepository.replace(id, userDataToValidate, res);
};

export function modify(id, userDataToValidate, res) {
  usersRepository.modify(id, userDataToValidate, res);
};

export function logicDelete(id, res) {
  usersRepository.logicDelete(id, res);
};

export function hardDelete(id, res) {
  usersRepository.hardDelete(id, res);
};
