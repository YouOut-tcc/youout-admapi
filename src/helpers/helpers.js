function valifyTokenFormat(header) {
  const authHeader = header.authorization;
  if (!authHeader) return "TOKEN_INEXISTENTE";
  const parts = authHeader.split(" ");
  if (parts.length == 1) return "TOKEN_INVALIDO";

  const [scheme, token] = parts;
  if (scheme != "Bearer") return "TOKEN_INVALIDO";

  return token;
}

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export {valifyTokenFormat, parseJwt}