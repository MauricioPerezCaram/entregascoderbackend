import { Router } from "express";
// // import orders from "../../data/fs/ordersManager.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
// import propsOrders from "../../middlewares/propsOrders.mid.js";

const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await orders.create(data);
    return res.json({
      statusCode: 201,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
ordersRouter.get("/", async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }
    const all = await orders.read({ filter });
    return res.json({
      statusCoder: 200,
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
      statusCoder: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
// ordersRouter.put();
// ordersRouter.delete();

// // definir los endpoints (CRUD)
// ordersRouter.post("/", propsOrders, async (req, res, next) => {
//   try {
//     const data = req.body;
//     const response = await orders.createOrder(data);
//     return res.json({
//       statusCode: 201,
//       response,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// ordersRouter.get("/", async (req, res, next) => {
//   try {
//     const all = await orders.readOrders();
//     return res.json({
//       statusCode: 200,
//       response: all,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// ordersRouter.get("/:oid", async (req, res, next) => {
//   try {
//     const { oid } = req.params;
//     const one = await orders.readOrderById(oid);
//     return res.json({
//       statusCode: 200,
//       response: one,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// ordersRouter.put("/:oid/:newquantity/:newstate", async (req, res, next) => {
//   try {
//     const { oid, newquantity, newstate } = req.params;
//     const one = await orders.update(oid, {
//       quantity: newquantity,
//       state: newstate,
//     });
//     return res.json({
//       statusCode: 200,
//       response: one,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// ordersRouter.delete("/:oid", async (req, res, next) => {
//   try {
//     const { oid } = req.params;
//     const response = await orders.destroyOrderById(oid);
//     return res.json({
//       statusCode: 200,
//       response,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

export default ordersRouter;
