import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
// import products from "./data/fs/products.fs.js";
// import users from "./data/fs/users.fs.js";
// import { error } from "console";

const server = express();

const PORT = 8080;
const ready = () => console.log("Servidor listo en puerto " + PORT);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
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
