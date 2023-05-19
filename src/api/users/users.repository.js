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

export async function getAllLength() {
  const usersLength = await userModel
    .countDocuments({ deleted: false });
  return usersLength;
}

export async function getByIndex({ index }) {
  const user = await userModel
    .findOne({}).skip(index)
    .populate({
      path: 'boss',
      select: 'username -_id',
    })
    .lean();
  return user;
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
    .findById(id)
    .populate({
      path: 'boss',
      select: 'username -_id',
    });
  return userById;
}

export async function getByUsername({ username }) {
  const userByUsername = await userModel
    .findOne({ username })
    .populate({
      path: 'boss',
      select: 'username -_id',
    });
  return userByUsername;
}

export async function getByFilter({ filter }) {
  const filteredUsers = await userModel
    .find({ deleted: false, ...filter })
    .populate({
      path: 'boss',
      select: 'username -_id',
    });
  return filteredUsers;
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
    .find({ deleted: false, boss: Object.values(id.id) })
    .lean();
  return activeUsers;
}

// export function create(userDataValidated) {
//   const userId = users.length ? users[users.length - 1].id + 1 : 1; // coger último id y sumar 1
//   const newUser = { id: userId, ...userDataValidated, deleted: false };
//   users.push(newUser);
//   return newUser;
// }

export async function create({ username, password }) {
  const newUser = await userModel
    .create(username, password);
  return newUser;
}

// export function replace(id, userDataToValidate) {
//   const activeUsers = getActiveUsers(users);
//   const index = activeUsers.findIndex((user) => user.id?.toString() === id.toString());
//   if ((index >= 0) && !activeUsers[index].deleted) {
//     activeUsers[index] = { id: id, ...userDataToValidate };
//       El id  de la linea anterior viene como string.
//       Concatenaria al hacer un nuevo put sobre el ultimo objeto de users.
//       Mejor usar el siguiente:
//     activeUsers[index] = { ...userDataToValidate, id: activeUsers[index].id };
//     return activeUsers[index];
//   }
//   return 'No existe el usuario con ese ID';
// }

export async function replace({ id, userDataValidated }) {
  const replacedUser = await userModel
    .findOneAndReplace({
      _id: id,
    }, userDataValidated, { new: true })
    .lean();
  return replacedUser;
}

export async function update({ id, userDataValidated }) {
  const updatedUser = await userModel
    .findOneAndUpdate({ _id: id }, userDataValidated, { new: true })
    .lean();
  return updatedUser;
}

export async function logicDelete({ id }) {
  await userModel
    .findByIdAndUpdate({ _id: id }, { deleted: true }, { new: true })
    .lean();
  const activeUsers = await userModel
    .find({ deleted: false });
  return activeUsers;
}

export async function hardDelete({ id }) {
  await userModel
    .findByIdAndDelete(id)
    .lean();
  const activeUsers = await userModel
    .find({ deleted: false });
  return activeUsers;
}
