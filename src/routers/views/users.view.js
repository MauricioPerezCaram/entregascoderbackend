import { Router } from "express";
import users from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await users.readUsers();
    return res.render("users", { users: all });
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/newuser", (req, res, next) => {
  try {
    return res.render("newuser");
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/login", (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
