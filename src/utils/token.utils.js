import jwt from "jsonwebtoken";

function createToken(data) {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
}

function verifyToken(headers) {
  const token = headers.token;
  if (token) {
    const data = jwt.verify(token, process.env.SECRET);
    return data;
    // FALTA AGREGAR QUE PASA SI NO ENCUENTRA TOKEN
  }
  const error = new Error("bad auth token");
  error.statusCode = 401;
  throw error;
}

export { createToken, verifyToken };
