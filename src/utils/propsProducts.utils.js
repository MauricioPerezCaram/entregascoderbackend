function propsProductsUtils(data) {
  const { name, price } = data;
  if (!name || !price) {
    const error = new Error("name & price are required");
    error.statusCode = 404;
    throw error;
  }
}

export default propsProductsUtils;
