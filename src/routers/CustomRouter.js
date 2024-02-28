import { Router } from "express";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}
  applyCbs(cbs) {
    return cbs.map((each) => async (...params) => {
      try {
        await each.apply(this, params);
      } catch (error) {
        /*return*/ params[1].json({
          statusCode: 500,
          message: error.message,
        });
      }
    });
  }

  responses = (req, res, next) => {
    res.success200 = (payload) =>
      res.json({
        statusCode: 200,
        response: payload,
      });
    res.success201 = (payload) =>
      res.json({
        statusCode: 201,
        response: payload,
      });
    res.error400 = (message) =>
      res.json({
        statusCode: 400,
        message,
      });
    res.error401 = () =>
      res.json({
        statusCode: 401,
        message: "Mala auth",
      });
    res.error403 = () =>
      res.json({
        statusCode: 403,
        message: "Prohibido, no tenes permiso",
      });
    res.error404 = () =>
      res.json({
        statusCode: 404,
        message: "No se ha encontrado",
      });
    return next();
  };

  create(path, ...cbs) {
    this.router.post(path, this.responses, this.applyCbs(cbs));
  }

  read(path, ...cbs) {
    this.router.get(path, this.responses, this.applyCbs(cbs));
  }

  update(path, ...cbs) {
    this.router.put(path, this.responses, this.applyCbs(cbs));
  }

  destroy(path, ...cbs) {
    this.router.delete(path, this.responses, this.applyCbs(cbs));
  }

  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCbs(cbs));
  }
}
