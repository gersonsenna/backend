const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function cifrarSenha(senha) {
  return bcrypt.hashSync(senha, 10);
}


function gerarToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SEGREDO,
    { expiresIn: "1h" }
  );
}


function verificarToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Token não informado" });
  }

  const [tipo, token] = authHeader.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(400).json({ msg: "Formato de token inválido" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SEGREDO);

    req.usuario = payload.email;
    next();

  } catch (err) {
    return res.status(401).json({ msg: "Token inválido ou expirado" });
  }
}

module.exports = { cifrarSenha, gerarToken, verificarToken };
