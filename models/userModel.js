import { users } from "../mock/database.js";

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.email === email);
    resolve(user);
  });
};

export const findById = (uid) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.uid === uid);
    resolve(user);
  });
};

export const save = async (user) => {
  const _user = await findById(user.uid);
  if (_user) {
    Object.assign(_user, user);
    return _user;
  }

  users.push(user);
  return user;
};
