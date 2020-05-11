const router = require("express").Router();
const apiFilsRoute = require("./api/films.router");
const apiUsersRoute = require("./api/users.router");
const middelware = require("./middleware");

router.use("/films", apiFilsRoute);
router.use("/users", apiUsersRoute);

module.exports = router;
