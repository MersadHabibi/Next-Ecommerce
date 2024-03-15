import bcrypt from "bcrypt";
var jwt = require("jsonwebtoken");

function createHash(password: string) {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(8)
      .then((salt) => {
        bcrypt
          .hash(password, salt)
          .then((hash) => {
            resolve(hash);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function checkPassword(password: string, userPassword: string) {
  return bcrypt.compareSync(password, userPassword);
}

export function generateToken(data: { username: string }) {
  return jwt.sign({ ...data }, process.env.SECRET_KEY);

}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

export { createHash };
