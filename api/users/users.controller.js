import * as usersService from './users.service.js';

function validData(userDataToValidate) { // aquí validariamos los datos de usuario
  return true;
}

export async function getAllActive(req, res) {
  const activeUsers = await usersService.getAllActive();
  res.json(activeUsers);
};

export async function getById(req, res) {
  const { id } = req.params;
  const userById = await usersService.getById({ id });
  res.json(userById);
};

export function getBoss(req, res) {
  const { id } = req.params;
  if (isNaN(id)) {
    res.json('El ID debe ser un número');
  } else {
    const boss = usersService.getBoss(id);
    res.json(boss);
  }
};

export function create(req, res) {
  const { userDataToValidate } = req.body;
  if (validData(userDataToValidate)) {
    const userDataValidated = userDataToValidate;
    newUser = usersService.addNew(userDataValidated);
    res.json(newUser);
  } else {
    res.json('Los datos de usuario no son válidos');
  }
};

export function replace(req, res) {
  const { id } = req.params;
  const userDataToValidate = req.body;
  if (isNaN(id)) {
    res.json('El ID debe ser un número');
  } else {
    if (validData(userDataToValidate)) {
      const userDataValidated = userDataToValidate;
      const replacedUser = usersService.replace(id, userDataValidated);
      res.json(replacedUser);
    } else {
      res.json('Los datos de usuario no son válidos');
    }
  }
};

export function update(req, res) {
  const { id } = req.params;
  const userDataToValidate = req.body;
  if (isNaN(id)) {
    res.json('El ID debe ser un número');
  } else {
    if (validData(userDataToValidate)) {
      const userDataValidated = userDataToValidate;
      updatedUser = usersService.update(id, userDataValidated);
      res.json(updatedUser);
    } else {
      res.json('Los datos de usuario no son válidos');
    }
  }
};

export function logicDelete(req, res) {
  const { id } = req.params;
  if (isNaN(id)) {
    res.json('El ID debe ser un número');
  } else {
    const activeUsers = usersService.logicDelete(id);
    res.json(activeUsers);
  }
};

export function hardDelete(req, res) {
  const { id } = req.params;
  if (isNaN(id)) {
    res.json('El ID debe ser un número');
  } else {
    const activeUsers = usersService.hardDelete(id);
    res.json(activeUsers);
  }
};
