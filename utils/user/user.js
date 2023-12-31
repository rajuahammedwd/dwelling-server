const { usersDB } = require("../../db/mongodb");

const getUser = async (email) => {
  const user = await usersDB.findOne({ email });
  return user;
};

module.exports = {
  getUser,
};
