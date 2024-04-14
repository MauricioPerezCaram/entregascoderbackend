const errors = {
  error: { message: "Error", statusCode: 400 },
  token: { message: "Invalid verified token!", statusCode: 400 },
  auth: { message: "Credenciales invalidas", statusCode: 401 },
  forbidden: { message: "Prohibido", statusCode: 403 },
  notFound: {
    message: "Documento no encontrado",
    statusCode: 404,
  },
  fatal: { message: "Error fatal", statusCode: 500 },
};

export default errors;
