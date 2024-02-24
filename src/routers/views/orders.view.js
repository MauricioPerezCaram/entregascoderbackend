import { Router } from "express";
import orders from "../../data/fs/ordersManager.fs.js";

const ordersRouter = Router();

ordersRouter.get("/", async (req, res, next) => {
  try {
    const all = await orders.readOrders();
    return res.render("orders", { products: all });
  } catch (error) {
    next(error);
  }
});

export default ordersRouter;
