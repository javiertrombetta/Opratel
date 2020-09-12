# Consigna: Parte 2 (Node)

> Primera Consigna: Web Service en SOAP (PHP):
> Sin utilizar ningún framework, crear un WS en SOAP utilizando las librerías nativas de PHP o en su defecto nusoap.
> El mismo debe contar con la capacidad de responder 4 tipos de consultas diferentes:
> 1- addUser: parámetros: username, password, email (metodo POST, respuesta: status_code = 0)
> 2- activateUser: parámetros: username (método POST, respuesta: status_code = 0)
> 3- deactivateUser: parámetros: username (método POST, respuesta: status_code = 0)
> 4- getUser: parametros: username (metodo GET, respuesta: username, password, email)
> Create WSDL del servicio.
> Script service.php con la implementación del WS y el objeto con sus respectivos métodos.
> Utilizar MySQL para persistir esta información
> Loggear en 3 niveles todo lo que se procese: access, debug y error, ej:
> [2019-05-15 10:00:00] INFO - "Procesamos request X | Param1: Y | Param2: Z"
> [2019-05-15 10:00:00] ERROR - "Hubo un error al intentar procesar request X"
> Ejemplo de consumo via consola de linux usando curl.

> Segunda Consigna: API Rest (NODE):
> Usando NodeJs y ExpressJs, implementar WS en Rest que funcione tal cual el WS anterior (mismos métodos y mismas
> respuestas), pero en lugar de SOAP/XML, en JSON puro (tanto recepción de request como respuesta).
> Utilizar MongoDB para persistir esta información.
> Loggear en 3 niveles todo lo que se procese: access, debug y error (modulo Winston), ej:
> [2019-05-15 10:00:00] INFO - "Procesamos request X | Param1: Y | Param2: Z"
> [2019-05-15 10:00:00] ERROR - "Hubo un error al intentar procesar request X"
> Ejemplo de consumo via consola de linux usando curl.

### Seteando el proyecto

Una vez pulleado el código, instalar las dependencias con:

```
yarn install
```

o

```
npm install
```

Crear un archivo `.env` en el root del proyecto e incluir el connection string de MongoDB. Ejemplo:

```
MONGO_DB_CONNECTION_STRING="mongodb+srv://<usuario>:<mypassword>@<server>"
```

Finalmente, ejecutar

```
yarn start
```

Y debería quedar el servidor escuchando en el puerto 3100.

### Estructura

El proyecto está organizado por "recursos", "unidades lógicas" o "casos de uso", los cuales a su vez constan de diferentes partes: controller, service, model y routes. Esto hace más fácil poder agregar funcionalidades y mantiene una separación entre la lógica de negocio y el código de "pegamento" o "estructural" haciendolo más mantenible y testeable.

### Ejemplos con `curl`

Para obtener un usuario:

```
curl http://localhost:3100/usuarios/user
```

Para crear un usuario

```
curl -X POST -H "Content-Type: application/json" -d "{\"username\": \"user\", \"password\": \"password\", \"email\": \"email\"}" http://localhost:3100/usuarios
```

Para desactivar un usuario:

```
curl -X POST -H "Content-Type: application/json" -d "{\"username\": \"user\"}" http://localhost:3100/usuarios/deactivate
```

Para activar un usuario:

```
curl -X POST -H "Content-Type: application/json" -d "{\"username\": \"user\"}" http://localhost:3100/usuarios/activate
```
