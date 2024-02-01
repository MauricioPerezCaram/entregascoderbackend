function notFoundOne(one) {
  if (!one) {
    const error = new Error("No hay producto con ese id");
    error.statusCode = 404;
    throw error;
  }
  return one;
}

export default notFoundOne;
