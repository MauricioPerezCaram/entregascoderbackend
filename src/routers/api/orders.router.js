import CustomRouter from "../CustomRouter.js";
//import orders from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREM"],
      passCallBackMid("jwt"),
      isAdmin,
      async (req, res, next) => {
        try {
          const data = req.body;
          const response = await orders.create(data);
          return res.json({ statusCode: 201, response });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await orders.read({ filter, options });
        return res.json({
          statusCode: 200,
          response: all,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const one = await orders.readOne(pid);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.update("/:pid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const data = req.body;
        const response = await orders.update(pid, data);
        return res.json({
          statusCode: 200,
          response: response,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.destroy("/:pid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const response = await orders.destroy(pid);
        return res.json({
          statusCode: 200,
          response,
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}
