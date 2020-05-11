const router = require("express").Router();
const { Films } = require("../../db/models/");

router.get("/", async (req, res) => {
  const films = await Films.findAll();
  res.json(films);
});

router.post("/", async (req, res) => {
  const films = await Films.create(req.body);
  res.json(films);
});

router.get("/:id", async (req, res) => {
  const films = await Films.findOne(req.body, {
    where: { id: req.params.id },
  });
  res.json(films);
});

router.put("/:id", async (req, res) => {
  await Films.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({ success: "Se ha modificado" });
});

router.delete("/:id", async (req, res) => {
  await Films.destroy({
    where: { id: req.params.id },
  });
  res.json({ success: "Se ha Eliminado" });
});

module.exports = router;
