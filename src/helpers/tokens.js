import jwt from "jsonwebtoken";

function generateToken(id, name, email) {
  const secret = "dsdasdas";
  return jwt.sign(
    { infoUser: { id, userName: name, email: email} },
    secret,
    { expiresIn: 60 * 60 * 5 }
  );
}

function generateTokenResetPassword(id) {
  const secret = "abetterpassword";
  return jwt.sign(
    { login: { id: id} },
    secret,
    // colocar um tempo diferente
    { expiresIn: 60 * 60 * 5 }
  );
}

export { generateToken, generateTokenResetPassword };