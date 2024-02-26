import { verifyToken } from "../utils/token.utils.js";

export default (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === 1) {
      req.session.isAdmin = true;
      return next();
    } else {
      req.session.isAdmin = false;
      const error = new Error(
        "No puedes crear un producto si no eres administrador"
      );
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
