import { Router } from "express";

const cookiesRouter = Router();

// setear
cookiesRouter.get("/set/:modo", async (req, res, next) => {
  try {
    const { modo } = req.params;
    const maxAge = 60000 * 5;
    const signed = true;
    return res
      .cookie("modo", modo, { maxAge })
      .cookie("sessionID", "hola1234", { maxAge, signed })
      .json({
        statusCode: 200,
        message: "Cookie configurada - modo: " + modo,
      });
  } catch (error) {
    return next(error);
  }
});

// leer
cookiesRouter.get("/get", async (req, res, next) => {
  try {
    const modo = req.cookies.modo;
    const sessionID = req.signedCookies.sessionID;
    return res.json({
      statuCode: 200,
      response: {
        modo,
        sessionID,
      },
    });
  } catch (error) {
    return next(error);
  }
});

// eliminar
cookiesRouter.get("/clear", async (req, res, next) => {
  try {
    return res
      .clearCookie("modo")
      .clearCookie("sessionID")
      .json({
        statusCode: 200,
        response: {
          modo: req.cookies.modo,
          sessionID: req.signedCookies.sessionID,
        },
      });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;
