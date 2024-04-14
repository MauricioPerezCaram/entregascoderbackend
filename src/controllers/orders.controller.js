import service from "../services/orders.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/CustomError.js";

class OrdersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.email) {
        filter.email = new RegExp(req.query.email.trim(), "i");
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }
      const all = await this.service.read({ filter, options });
      if (all.docs.length > 0) {
        return res.success200(all);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const one = await this.service.readOne(oid);
      if (one) {
        return res.success200(one);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const one = await this.service.update(oid, data);
      if (one) {
        return res.success200(one);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const one = await this.service.destroy(oid);
      if (one) {
        return res.success200(one);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
