const express = require("express");
const colors = express.Router();
const { getAllColors, getColor, createColor, deleteColor, updateColor } = require("../queries/color");
const { checkName, checkBoolean } = require("../validations/checkcolors.js")

// INDEX
colors.get("/", async (req, res) => {
  const allColors = await getAllColors();
  if (allColors[0]) {
    res.status(200).json(allColors);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

colors.get("/:id", async (req, res) => {
  const { id } = req.params;
  const color = await getColor(id);
  if (color) {
    res.json(color);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

colors.post("/", checkBoolean, checkName, async (req, res) => {
  const body = req.body
  const color = await createColor(body);
  res.json(color);
});

colors.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedColor = await deleteColor(id);
  if (deletedColor.id) {
    res.status(200).json(deletedColor);
  } else {
    res.status(404).json("Color not found");
  }
});


colors.put("/:id", checkName, checkBoolean, async(req, res) => {
  const { id } = req.params
  const body = req.body
  const updatedColor = await updateColor(id, body)
  if(updatedColor.id){
    res.status(200).json(updateColor);
  } else {
    res.status(404).json("Color not found");
  }
});


module.exports = colors;