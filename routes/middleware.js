const jwt = require("jwt-simple");
const moment = require("moment");

const checkToken = (req, res, netx) => {
  //comprobar
  if (!req.headers["user-token"]) {
    return res.json({ error: "necesitas el token" });
  }
  const userToken = req.headers["user-token"];
  let payload = {};
  try {
    payload = jwt.decode(userToken, "fraseDelToken");
  } catch (err) {
    return res.json({ error: "El token es incorrecto" });
  }

  //EXPIRACION DEL TOKEN
  if (payload.expiredAt < moment().unix()) {
    return res.json({ error: "El token a expirado" });
  }

  req.id = payload.id;

  netx();
};

module.exports = { checkToken };
