import { users } from "../data/mongo/manager.mongo.js";

class UsersController {
  constructor() {
    this.model = users;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.model.create(data);
      return res.json({
        statusCode: 201,
        response,
      });
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
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
      const all = await this.model.read({ filter, orderAndPaginate });
      return res.json({
        statusCode: 200,
        response: all,
      });
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.model.readOne(uid);
      return res.json({
        statusCode: 200,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await this.model.update(uid, data);
      return res.json({
        statusCode: 200,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await this.model.destroy(uid);
      return res.json({
        statusCode: 200,
        response,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
