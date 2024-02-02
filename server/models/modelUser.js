import conn from "../dbConn/conn.js";

export const register = (email, confPassword) => {
  const query = `INSERT INTO users(email, password) VALUES ('${email}', '${confPassword}')`;
  return conn.execute(query);
};

export const insertRefreshToken = (id, email, password, refreshToken) => {
  const query = `UPDATE users SET email='${email}', password='${password}', refreshToken='${refreshToken}' WHERE id=${id}`;
  return conn.execute(query);
};

export const getByEmail = (email) => {
  const query = `SELECT * FROM users WHERE email='${email}'`;
  return conn.execute(query);
};

export const getByRefreshToken = (refreshToken) => {
  const query = `SELECT * FROM users WHERE refreshToken='${refreshToken}'`;
  return conn.execute(query);
};

export const getAllUser = () => {
  const query = "SELECT * FROM users";
  return conn.execute(query);
};
