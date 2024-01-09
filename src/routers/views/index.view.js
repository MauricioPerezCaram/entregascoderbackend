import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index", {});
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
