import { Router } from "express";

const sessionRouter = Router();

// Register
sessionRouter.post("/register", async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
});

// Login
sessionRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password === "hola1234") {
      req.session.email = email;
      req.session.role = "admin";
      return res.json({
        statusCode: 200,
        message: "Logged in",
        session: req.session,
      });
    }
    const error = new Error("Bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

// me
sessionRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Session con email: " + req.session.email,
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

// signout
sessionRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Signed out",
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default sessionRouter;
