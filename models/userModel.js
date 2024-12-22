import { users } from "../mock/database.js";

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.email === email);
    resolve(user);
  });
};
