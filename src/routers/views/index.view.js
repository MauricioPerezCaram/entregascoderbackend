import { Router } from "express";

import { products } from "../../data/mongo/manager.mongo.js";

import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import sessionsRouter from "./sessions.view.js";
import ordersRouter from "./orders.view.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 4,
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
    const all = await products.read({ filter, options });
    return res.render("index", {
      products: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      title: "INDEX",
      filter: req.query.title,
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/orders", ordersRouter);
viewsRouter.use("/sessions", sessionsRouter);

export default viewsRouter;
