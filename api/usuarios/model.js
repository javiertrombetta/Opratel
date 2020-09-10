const mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Definicion del modelo. Definimos el usuario solamente con los campos y el tipo de dato. Por ahora no se realiza
// ningún tipo de validación (se podría usar el mismo mongoose).

var UserSchema = new Schema({
  username: String,
  // Por ahora la password va plana, una opción es en la definición del modelo (acá) podríamos encriptarla antes de guardar a bd (bcrypt)
  password: String,
  email: String,
  active: { type: Boolean, default: true },
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
