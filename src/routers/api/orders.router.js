import { Router } from "express";
import orders from "../../data/fs/ordersManager.fs.js";
import propsOrders from "../../middlewares/propsOrders.mid.js";

const ordersRouter = Router();

// definir los endpoints (CRUD)
ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orders.createOrder(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const all = await orders.readOrders();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await orders.readOrderById(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await orders.destroyOrderById(oid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
