import { Router } from "express";
// import products from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";

import propsProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

// definir los endpoints (CRUD)
productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

// NO SE USA ESTE
productsRouter.put("/:pid/:quantity", async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const response = await products.update(quantity, pid);
    return res.json({
      statusCode: 200,
      response: "Stock disponible: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
