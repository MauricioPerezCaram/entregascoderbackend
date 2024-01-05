import express from "express";
import products from "./src/data/fs/products.fs.js";
import users from "./src/data/fs/users.fs.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("Servidor listo en puerto " + PORT);

server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

// PRODUCTS
server.get("/api/products", (req, res) => {
  try {
    const all = products.readProducts();
    if (Array.isArray(all)) {
      return res.status(200).json({
        success: true,
        response: all,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const one = products.readProductById(pid);
    return res.status(200).json(one);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// USERS
server.get("/api/users", (req, res) => {
  try {
    const all = users.readUsers();
    if (Array.isArray(all)) {
      return res.status(200).json({
        success: true,
        response: all,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", (req, res) => {
  try {
    const { uid } = req.params;
    const one = users.readUserById(uid);
    return res.status(200).json(one);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
