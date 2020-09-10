const Usuario = require("./model");

const createUser = async (user) => {
  try {
    var newUser = new Usuario(user);

    newUser.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

const findUser = async (username) => {
  try {
    const user = await Usuario.find({ username }).exec();
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateUser = async (username, active) => {
  try {
    let user = await Usuario.findOneAndUpdate({ username }, { active });
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createUser,
  findUser,
  updateUser,
};
