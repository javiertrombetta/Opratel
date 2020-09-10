require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var expressWinston = require("express-winston");
var winston = require("winston");
var mongoose = require("mongoose");

const usuariosRoutes = require("./api/usuarios/routes");

var mongoDB = process.env.MONGO_DB_CONNECTION_STRING;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging: configuramos logging para cada request y error.
// Agrego el body a whitelist para mostrar parametros. Esto no sería una gran práctica ya que puede ser que
// loguiemos informaciòn sensible como una password. Se podrían loggear solo los parametros de url y query string.
//[2019-05-15 10:00:00] INFO - "Procesamos request X | Param1: Y | Param2: Z"
const infoFormat = winston.format.printf(({ level, message, req, timestamp }) => {
  return `[${timestamp}] ${level} - Procesado: ${message}`;
});
1;
const errorFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] ${level} - Error al procesar ${message}`;
});

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), infoFormat),
    msg: "{{req.method}} {{req.url}} Parametros: {{JSON.stringify(req.body)}} Status:{{res.statusCode}}",
    requestWhitelist: ["body"],
  })
);

app.use("/usuarios", usuariosRoutes);

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), errorFormat),
  })
);

app.listen(3100, function () {
  console.log("listening on 3100");
});
