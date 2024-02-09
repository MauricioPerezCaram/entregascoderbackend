function isValidPass(formPassword, dbPassword) {
  if (formPassword !== dbPassword) {
    const error = new Error("Credenciales incorrectas");
    error.statusCode = 401;
    throw error;
  }
}

export default isValidPass;
