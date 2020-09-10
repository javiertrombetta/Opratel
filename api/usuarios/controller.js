const { createUser, findUser, updateUser } = require("./service");
// En el controller vamos a poner las funciones que handlean los requests, principalmente lo que tiene que ver con HTTP
// Por ejemplo, parsear el body, armar el JSON de devolución, pasar al middleware de error, etc.
// La lógica de negocio entonces va a quedar principalmente en los services.

// Status Codes: Devuelvo 200 cuando el request se realiza de forma exitosa. 500 para Internal Server Error.
// Por ahora usamos estos códigos, ya que por ejemplo no hay validación específica.

const addUser = async (req, res, next) => {
  try {
    const user = req.body;
    await createUser(user);
    res.sendStatus(200);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await findUser(req.params.username);
    res.send(user);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

const activateUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    await updateUser(username, true);
    res.sendStatus(200);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

const deactivateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username } = req.body;
    await updateUser(username, false);
    res.sendStatus(200);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

module.exports = {
  addUser,
  getUser,
  activateUser,
  deactivateUser,
};
