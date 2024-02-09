function has8char(password) {
  if (password.length < 8) {
    const error = new Error("La contraseña debe tener al menos 8 caracteres");
    error.statusCode = 400;
    throw error;
  }
}

export default has8char;
