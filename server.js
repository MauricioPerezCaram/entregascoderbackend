//// Desarrollar un servidor de express que funcione en el puerto 8080 y que incorpore todos los middlewares necesarios para que la aplicación funcione correctamente:
//// json, urlencoded, static
//// morgan
//// handlers (error y path)
// Enrutar correctamente los managers de fs de products, users y orders.
//// Estructurar el servidor según la siguiente imagen:

// Cada manager (products, users) de memory y de fs debe contar con los métodos:

//// create(data) el cual agregará un producto/usuario (id con crypto).
//// read() el cual debe devolver el arreglo con todos los productos/usuarios.
//// readOne(id) el cual debe devolver el objeto producto/usuario.
//// destroy(id) el cual eliminará el objeto producto/usuario de la lista.

// Agregar a cada manager  (products, users) de memory y de fs:
// update(id, data) el cual actualizará el objeto producto/usuario de la lista.

// Nota: manejar TODAS las respuestas de éxito o fracaso SÓLO con las propiedades:
// statusCode: para el código
// response: para responder con datos e incluso para responder con los strings de los errores

// Manager de órdenes:
// Las órdenes tienen las propiedades:
// id (propio del objeto)
// pid (id del producto)
// uid (id del usuario)
// quantity (cantidad ordenada)
// state (estado de la compra)

// Clase OrdersManager (de memory y fs):
// create(data) el cual creará la orden del usuario (uid) para reservar (state) la cantidad (quantity) del producto (pid).
// read() el cual debe devolver el arreglo con todos las órdenes.
// readOne(uid) el cual debe devolver todas las órdenes que tiene el usuario (uid) en el carrito. (en clase sugirieron readByUser)
// update(oid, quantity, state) el cual debe modificar la cantidad o el estado de la orden oid del carrito.
// destroy(oid) el cual debe quitar la orden oid del carrito del usuario.

// Endpoints de productos:
// POST /api/products debe implementar el método create(data) de fs.
// GET /api/products debe implementar el método read() de fs.
// GET /api/products/:pid debe implementar el método readOne(id) de fs.
// PUT /api/products/:pid debe implementar el método update(id, data) de fs.
// DELETE /api/products/:pid debe implementar el método destroy(id) de fs.

// Endpoints de usuarios:
// POST /api/users debe implementar el método create() de fs.
// GET /api/users debe implementar el método read() de fs.
// GET /api/users/:uid debe implementar el método readOne(id) de fs.

// Endpoints de órdenes:
// POST /api/orders debe implementar el método create(data) de fs.
// GET /api/orders/:uid debe implementar el método readOne(id) de fs.
// DELETE /api/orders/:oid debe implementar el método destroy(id) de fs.

import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
// import products from "./data/fs/products.fs.js";
// import users from "./data/fs/users.fs.js";
// import { error } from "console";

const server = express();

const PORT = 8080;
const ready = () => console.log("Servidor listo en puerto " + PORT);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

// // PRODUCTS
// // Crear producto
// server.post("/api/products", async (req, res) => {
//   try {
//     const data = req.body;
//     const response = await products.createProduct(data);
//     if (response === "El nombre y la foto del producto es necesario") {
//       return res.json({
//         statusCode: 400,
//         message: response,
//       });
//     } else {
//       return res.json({
//         statusCode: 201,
//         message: "Producto creado",
//         response,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });

// // Leer productos
// server.get("/api/products", async (req, res) => {
//   try {
//     const all = await products.readProducts();

//     if (Array.isArray(all)) {
//       return res.json({
//         statusCode: 200,
//         response: all,
//       });
//     } else {
//       return res.json({
//         statusCode: 404,
//         message: all,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });

// // Leer un producto
// server.get("/api/products/:pid", async (req, res) => {
//   try {
//     const { pid } = req.params;
//     const one = await products.readProductById(pid);
//     if (typeof one === "string") {
//       return res.json({
//         statusCode: 404,
//         message: one,
//       });
//     } else {
//       res.json({
//         statusCode: 200,
//         response: one,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });

// // Vender productos (disminuir stock)
// server.put("/api/products/:pid/:quantity", async (req, res) => {
//   try {
//     const { pid, quantity } = req.params;
//     const response = await products.soldProduct(quantity, pid);
//     if (typeof response === "number") {
//       return res.json({
//         statusCode: 200,
//         response: "Stock disponible " + response,
//       });
//     } else if (response === "No existe ese producto") {
//       return res.json({
//         statusCode: 404,
//         message: error.message,
//       });
//     } else {
//       return res.json({
//         statusCode: 400,
//         return: response,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });

// // Eliminar producto
// server.delete("/api/products/:pid", async (req, res) => {
//   try {
//     const { pid } = req.params;
//     const response = await products.destroyProductById(pid);
//     if (response === "No hay producto para borrar con el id ") {
//       return res.json({
//         statusCode: 404,
//         message: response,
//       });
//     } else {
//       return res.json({
//         statusCode: 200,
//         response,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });

// // USERS
// // Crear usuario
// server.post("/api/users", async (req, res) => {
//   try {
//     const data = req.body;
//     const response = await users.createUsers(data);
//     if (response === "El nombre,la foto y el mail del usuario es necesario") {
//       return res.json({
//         statusCode: 400,
//         message: response,
//       });
//     } else {
//       return res.json({
//         statusCode: 201,
//         message: "Usuario creado",
//         response,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });

// // Leer usuarios
// server.get("/api/users", async (req, res) => {
//   try {
//     const all = await users.readUsers();
//     if (Array.isArray(all)) {
//       return res.json({
//         statusCode: 200,
//         response: all,
//       });
//     } else {
//       return res.json({
//         statusCode: 404,
//         message: all,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });

// // Leer un usuario
// server.get("/api/users/:uid", async (req, res) => {
//   try {
//     const { uid } = req.params;
//     const one = await users.readUserById(uid);
//     if (typeof one === "string") {
//       return res.json({
//         statusCode: 404,
//         message: one,
//       });
//     } else {
//       res.json({
//         statusCode: 200,
//         response: one,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });

// // Eliminar usuario
// server.delete("/api/users/:uid", async (req, res) => {
//   try {
//     const { uid } = req.params;
//     const response = await users.destroyUserById(uid);
//     if (response === "No hay usuario para borrar con el id ") {
//       return res.json({
//         statusCode: 404,
//         message: response,
//       });
//     } else {
//       return res.json({
//         statusCode: 200,
//         response,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// });

server.listen(PORT, ready);
