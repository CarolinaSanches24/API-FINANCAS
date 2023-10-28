const jwt = require("jsonwebtoken");

const autenticacao = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado",
      });
    }

    const secretKey = process.env.SECRET_KEY;

    const usuario = jwt.verify(token, secretKey);

    req.usuarioId = usuario.id;

    next();
  } catch (error) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado",
    });
  }
};

module.exports = autenticacao;
