import express from "express";
import products from "./data/fs/products.fs.js";
import users from "./data/fs/users.fs.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("Servidor listo en puerto " + PORT);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// PRODUCTS
// Crear
server.post("/api/products", async (req, res) => {
  try {
    const data = req.body;
    const response = await products.createProduct(data);
    if (response === "El nombre y la foto del producto es necesario") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        message: "Creado",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// Leer productos
server.get("/api/products", async (req, res) => {
  try {
    const all = await products.readProducts();

    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// Leer uno
server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await products.readProductById(pid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// Vender productos
server.put("/api/products/:pid/:quantity", async (req, res) => {
  try {
    const { pid, quantity } = req.params;
    const response = await products.soldProduct(quantity, pid);
    if (response) {
      return res.json({
        statusCode: 200,
        response: "Stock disponible " + response,
      });
    } else {
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// Eliminar productos
server.delete("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await products.destroyProductById(pid);
    if (response === "No hay producto para borrar con el id ") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// // USERS
// server.get("/api/users", (req, res) => {
//   try {
//     const all = users.readUsers();
//     if (Array.isArray(all)) {
//       return res.status(200).json({
//         success: true,
//         response: all,
//       });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: all,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// server.get("/api/users/:uid", (req, res) => {
//   try {
//     const { uid } = req.params;
//     const one = users.readUserById(uid);
//     return res.status(200).json(one);
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

server.listen(PORT, ready);
