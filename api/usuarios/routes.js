const express = require("express");
const router = express.Router();

const { addUser, activateUser, deactivateUser, getUser } = require("./controller");

// Nombres de las rutas: un punto importante de REST es que las rutas sean descriptivas, usando correctamente el verbo HTTP e identificando correctamente los "recursos" para armar el URI.
// En este caso, el recurso es "usuarios", asi que la ruta base va a ser esa, eso esta especificado en 'index.js' cuando seteamos las rutas acá exportadas.
// De esta forma tenemos, por ejemplo para crear un usuario: "POST /usuarios" y para obtener un usuario: "GET /usuarios/:username"

router.post("/", addUser);
// Para las rutas de activación/desactivación hay varias alternativas, usar PUT a /usuarios/:username es una. PUT y username en el body es otra.
// Para respetar la consigna, se usa POST a /usuarios/deactivate con el username en el body.
router.post("/deactivate", deactivateUser);
router.post("/activate", activateUser);
// Mejor sería pasar por parametro un "userID". En el caso del username, otra opción es pasarlo por query string.
router.get("/:username", getUser);

module.exports = router;
