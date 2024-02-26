function propsProductsUtils(data) {
  const { name, price } = data;
  if (!name || !price) {
    const error = new Error("Nombre y precio es requerido");
    error.statusCode = 404;
    throw error;
  }
}

export default propsProductsUtils;
