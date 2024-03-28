import { Router } from "express";
import service from "../../services/orders.service.js";

const ordersRouter = Router();

ordersRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 12,
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
    const all = await service.read({ filter, options });
    return res.render("orders", {
      orders: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      title: "ORDERS",
      filter: req.query.title,
    });
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await service.readOne(oid);
    return res.render("detail", {
      order: one,
      title: one.title.toUpperCase(),
    });
  } catch (error) {
    next(error);
  }
});

export default ordersRouter;
