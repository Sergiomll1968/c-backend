import users from './users.database.js';

function getActiveUsers() {
  return users.filter(user => !user.deleted);
}

export function getAll(req, res) {
  res.json(getActiveUsers(users));
};

export function getId(id, res) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((activeUser) => activeUser.id?.toString() === id.toString());
  if (index >= 0) {
    res.json(activeUsers[index]);
  } else {
    res.json('No existe el usuario con ese ID');
  }
};

export function getBoss(id, res) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((activeUser) => activeUser.id?.toString() === id.toString());
  if (index >= 0) {
    const employees = activeUsers.filter((activeUser) => activeUser.boss?.toString() === id.toString());
    if (employees) {
      const x = employees.map(employee => employee.id);
      const result = `El jefe con ID -> ${id} tiene los empleados con ID's: ${x}`;
      res.json(result);
    } else {
      res.json('No existen empleados para el jefe con ese ID');
    }
  } else {
    res.json('No existe el jefe con ese ID');
  }
};

export function addNew(req, res) {
  const userId = users.length ? users[users.length - 1].id + 1 : 1; // coger último id y sumar 1
  let user = { id: userId, ...req.body, deleted: false };
  users.push(user);
  res.json(user);
};

export function replace(id, userDataToValidate, res) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((user) => user.id?.toString() === id.toString());
  if ((index >= 0) && !activeUsers[index].deleted) {
    // activeUsers[index] = { id: id, ...userDataToValidate }; Este id viene como string y concatenaria al hacer un nuevo put sobre el ultimo objeto de users
    activeUsers[index] = { id: activeUsers[index].id, ...userDataToValidate };
    res.json(activeUsers[index]);
  } else {
    res.json('No existe el usuario con ese ID');
  }
};

export function modify(id, userDataToValidate, res) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((user) => user.id?.toString() === id.toString());
  if ((index >= 0) && !activeUsers[index].deleted) {
    // activeUsers[index] = { ...activeUsers[index], ...newProps, id: id }; Este id viene como string y concatenaria al hacer un nuevo patch sobre el ultimo objeto de users
    activeUsers[index] = { ...activeUsers[index], ...userDataToValidate, id: activeUsers[index].id };
    res.json(activeUsers[index]);
  } else {
    res.json('No existe el usuario con ese ID');
  }
};

export function logicDelete(id, res) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((user) => user.id?.toString() === id.toString());
  if ((index >= 0) && !activeUsers[index].deleted) {
    activeUsers[index].deleted = true;
    res.json(activeUsers);
  } else {
    res.json('No existe el usuario con ese ID');
  }
};

export function hardDelete(id, res) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((user) => user.id?.toString() === id.toString());
  if ((index >= 0) && !activeUsers[index].deleted) {
    activeUsers.splice(index, 1);
    res.json(activeUsers);
  } else {
    res.json('No existe el usuario con ese ID');
  }
};
