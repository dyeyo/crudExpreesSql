const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");
const { Users } = require("../../db/models/");

router.post(
  "/register",
  [
    check("firstName", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("lastName", "El apellido de usuario es obligatorio").not().isEmpty(),
    check("email", "El Emial es obligatorio").not().isEmpty(),
    check("email", "El Email es incorrecto").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errores: errors.array() });
    }
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const uses = await Users.create(req.body);
    res.json(uses);
  }
);

router.post("/login", async (req, res) => {
  const user = await Users.findOne({
    where: { email: req.body.email },
  });
  if (user) {
    const validatePassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (validatePassword) {
      res.json({ success: createToken(user) });
    } else {
      res.json({ error: "Error en usuario y/o contraseña" });
    }
  } else {
    res.json({ error: "Error en usuario y/o contraseña" });
  }
});

const createToken = (user) => {
  const payload = {
    id: user.id,
    createAt: moment().unix(),
    expiredAt: moment().add(5, "minute").unix(),
  };
  return jwt.encode(payload, "fraseDelToken");
};
module.exports = router;
