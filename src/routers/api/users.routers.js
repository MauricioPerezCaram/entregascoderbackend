import { Router } from "express";
import users from "../../data/fs/users.fs.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";

const usersRouter = Router();

// definir los endpoints (CRUD)
usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.createUser(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await users.readUsers();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readUsersById(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid/:newname", async (req, res, next) => {
  try {
    const { uid, newname } = req.params;
    const one = await users.update(uid, { newname });
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await users.destroyUserById(uid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
