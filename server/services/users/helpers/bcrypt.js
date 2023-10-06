const bcrypt = require("bcryptjs");

const hashPass = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(8));
};

const comparePass = (plainPassword, hashedPass) => {
  return bcrypt.compareSync(plainPassword, hashedPass);
};

module.exports = {
  hashPass,
  comparePass,
};