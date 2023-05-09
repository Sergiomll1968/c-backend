import * as usersService from './users.service.js';

function validData(userDataToValidate) { // aquí validariamos los datos de usuario
  return true;
}

export function getAll(req, res) {
  usersService.getAll(req, res);
};

export function getId(req, res) {
  const { id } = req.params;
  if (isNaN(id)) {
    res.json('El ID debe ser un número');
  } else {
    usersService.getId(id, res);
  }
};

export function getBoss(req, res) {
  const { id } = req.params;
  if (isNaN(id)) {
    res.json('El ID debe ser un número');
  } else {
    usersService.getBoss(id, res);
  }
};

export function addNew(req, res) {
  const { userDataToValidate } = req.body;
  if (validData(userDataToValidate)) {
    usersService.addNew(req, res);
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
      usersService.replace(id, userDataToValidate, res);
    } else {
      res.json('Los datos de usuario no son válidos');
    }
  }
};

export function modify(req, res) {
  const { id } = req.params;
  const userDataToValidate = req.body;
  if (isNaN(id)) {
    res.json('El ID debe ser un número');
  } else {
    if (validData(userDataToValidate)) {
      usersService.modify(id, userDataToValidate, res);
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
    usersService.logicDelete(id, res);
  }
};

export function hardDelete(req, res) {
  const { id } = req.params;
  if (isNaN(id)) {
    res.json('El ID debe ser un número');
  } else {
    usersService.hardDelete(id, res);
  }
};
