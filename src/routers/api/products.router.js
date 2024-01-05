import { Router } from "express";
import products from "../../data/fs/products.fs.js";

const productsRouter = Router();

// definir los endpoints (CRUD)
productsRouter.post("/", async (req, res) => {
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
        message: "Producto creado",
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
productsRouter.get("/", async (req, res) => {
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
productsRouter.get("/:pid", async (req, res) => {
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
productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid, quantity } = req.params;
    const response = await products.soldProduct(quantity, pid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "Stock disponible " + response,
      });
    } else if (response === "No existe ese producto") {
      return res.json({
        statusCode: 404,
        message: error.message,
      });
    } else {
      return res.json({
        statusCode: 400,
        return: response,
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
productsRouter.delete("/:pid", async (req, res) => {
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

export default productsRouter;
