import { Router } from "express";

import users from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.use("/profile", (req, res, next) => {
  try {
    const one = users.readUsersById("505457baee5c05601a2bc613");
    console.log(one);
    return res.render("profile", { one });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
