// import users from './users.database.js';
import userModel from './users.model.js';

// function getActiveUsers() {
//   return users.filter(user => !user.deleted);
// }

// export function getAllActive() {
//   const activeUsers = getActiveUsers(users);
//   return activeUsers;
// };

export async function getAllActive() {
  const activeUsers = await userModel
    .find({ deleted: false })
    .populate({
      path: 'boss',
      select: 'username -_id',
    })
    .lean();
  return activeUsers;
}

// export function getById(id) {
//   const activeUsers = getActiveUsers(users);
//   const index = activeUsers.findIndex((activeUser)=>
//     activeUser.id?.toString() === id.toString());
//   if (index >= 0) {
//     return activeUsers[index];
//   } else {
//     return 'No existe el usuario con ese ID';
//   }
// };

export async function getById({ id }) {
  const userById = await userModel
    .findById(id);
  return userById;
}

// export function getBoss(id) {
//   const activeUsers = getActiveUsers(users);
//   const index = activeUsers.findIndex(
//     (activeUser) => activeUser.id?.toString() === id.toString());
//   if (index >= 0) {
//     const employees = activeUsers.filter(
//       (activeUser) => activeUser.boss?.toString() === id.toString());
//     if (employees) {
//       const x = employees.map((employee) => employee.id);
//       const result = `El jefe con ID -> ${id} tiene los empleados con ID's: ${x}`;
//       return result;
//     } else {
//       return 'No existen empleados para el jefe con ese ID';
//     }
//   } else {
//     return 'No existe el jefe con ese ID';
//   }
// }

export async function getBoss({ id }) {
  const activeUsers = await userModel
    .find({ deleted: false, boss: Object.values(id) })
    .lean();
  return activeUsers;
}

// export function create(userDataValidated) {
//   const userId = users.length ? users[users.length - 1].id + 1 : 1; // coger último id y sumar 1
//   const newUser = { id: userId, ...userDataValidated, deleted: false };
//   users.push(newUser);
//   return newUser;
// }

export async function create({ userDataValidated }) {
  const newUserToCreate = { ...userDataValidated, deleted: false };
  const newUser = await userModel
    .create(newUserToCreate);
  return newUser;
}

export function replace(id, userDataToValidate) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((user) => user.id?.toString() === id.toString());
  if ((index >= 0) && !activeUsers[index].deleted) {
    // activeUsers[index] = { id: id, ...userDataToValidate }; Este id viene como string y concatenaria al hacer un nuevo put sobre el ultimo objeto de users
    activeUsers[index] = { ...userDataToValidate, id: activeUsers[index].id };
    return activeUsers[index];
  } else {
    return 'No existe el usuario con ese ID';
  }
}

export function update(id, userDataValidated) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((user) => user.id?.toString() === id.toString());
  if ((index >= 0) && !activeUsers[index].deleted) {
    // activeUsers[index] = { ...activeUsers[index], ...newProps, id: id }; Este id viene como string y concatenaria al hacer un nuevo patch sobre el ultimo objeto de users
    activeUsers[index] = { ...activeUsers[index], ...userDataValidated, id: activeUsers[index].id };
    return activeUsers[index];
  } else {
    return 'No existe el usuario con ese ID';
  }
}

export function logicDelete(id) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((user) => user.id?.toString() === id.toString());
  if ((index >= 0) && !activeUsers[index].deleted) {
    activeUsers[index].deleted = true;
    return activeUsers;
  } else {
    return 'No existe el usuario con ese ID';
  }
}

export function hardDelete(id) {
  const activeUsers = getActiveUsers(users);
  const index = activeUsers.findIndex((user) => user.id?.toString() === id.toString());
  if ((index >= 0) && !activeUsers[index].deleted) {
    activeUsers.splice(index, 1);
    return activeUsers;
  } else {
    return 'No existe el usuario con ese ID';
  }
}
