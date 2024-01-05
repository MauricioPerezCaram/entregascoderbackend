function propsUsers(req, res, next) {
  // esta funcion debe controlar que mando todas las propiedades obligatorias
  const { name, photo, email } = req.body;
  if (!name || !photo || !email) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} El nombre, la foto y el email del usuario del usuario es necesario`,
    });
  } else {
    return next();
  }
}

export default propsUsers;
