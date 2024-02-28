import CustomRouter from "../CustomRouter.js";
// import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", propsUsers, async (req, res, next) => {
      try {
        const data = req.body;
        const response = await users.create(data);
        return res.json({
          statusCode: 201,
          response,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/", async (req, res, next) => {
      try {
        const orderAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { name: 1 },
        };
        const filter = {};
        if (req.query.email) {
          filter.email = new RegExp(req.query.email.trim(), "i");
        }
        if (req.query.name) {
          filter.name = new RegExp(req.query.name.trim(), "i");
        }
        if (req.query.name === "desc") {
          orderAndPaginate.sort.name = -1;
        }
        const all = await users.read({ filter, orderAndPaginate });
        return res.json({
          statusCode: 200,
          response: all,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.readOne(uid);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.update("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const one = await users.update(uid, data);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.destroy("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const response = await users.destroy(uid);
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
