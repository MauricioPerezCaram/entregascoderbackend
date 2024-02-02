import { Router } from "express";
// import orders from "../../data/fs/ordersManager.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";

const ordersRouter = Router();

// definir los endpoints (CRUD)
ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orders.create(data);
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
    const orderAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { _id: 1 },
    };
    const filter = {};
    const all = await orders.read({ filter, orderAndPaginate });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      // sort: { _id: 1 },
    };
    const filter = {};
    if (req.query._id) {
      filter._id = new RegExp(req.query._id.trim(), "i");
    }
    if (req.query._id === "desc") {
      orderAndPaginate.sort._id = -1;
    }
    const all = await orders.read({ filter, orderAndPaginate });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const all = await orders.read();
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
    const one = await orders.readOne(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body;
    const one = await orders.update(oid, data);
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
    const response = await orders.destroy(oid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
