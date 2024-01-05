function propsProducts(req, res, next) {
  // esta funcion debe controlar que mando todas las propiedades obligatorias
  const { title, photo } = req.body;
  if (!title || !photo) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} El nombre y la foto del producto es necesario`,
    });
  } else {
    return next();
  }
}

export default propsProducts;
