function propsOrders(req, res, next) {
  // esta funcion debe controlar que mando todas las propiedades obligatorias
  const { state } = req.body;
  if (!state) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} El estado es necesario`,
    });
  } else {
    return next();
  }
}

export default propsOrders;
