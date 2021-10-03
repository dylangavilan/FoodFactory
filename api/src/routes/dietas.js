const express = require("express");
const router = express.Router();
const { Diet } = require("../db");

router.use(express.json());
router.get("/", async (req, res) => {
  const AllDiets = await Diet.findAll();
  res.send(AllDiets);
});
module.exports = router;
