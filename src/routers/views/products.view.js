import { Router } from "express";

import { products } from "../../data/mongo/manager.mongo.js";

import passCallBack from "../../middlewares/passCallBack.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.get(
  "/products",
  passCallBack("jwt"),
  isAdmin,
  (req, res, next) => {
    try {
      return res.render("products", { title: "PRODUCTS" });
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.get("/new", passCallBack("jwt"), isAdmin, (req, res, next) => {
  try {
    return res.render("new", { title: "Crea un producto" });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.render("detail", {
      product: one,
      title: one.title.toUpperCase(),
    });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
