import { Router } from "express";

import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = ["Producto 1", "Producto 2", "Producto 3"];
    const date = new Date();
    return res.render("index", {
      products: mainProducts,
      date,
      //   details: "Detalle de página de inicio",
    });
  } catch (error) {
    next(error);
  }
});
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;
