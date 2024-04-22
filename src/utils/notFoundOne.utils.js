function notFoundOne(one) {
  if (!one) {
    const error = new Error("No existe ningun documento");
    error.statusCode = 404;
    throw error;
  }
}

export default notFoundOne;
