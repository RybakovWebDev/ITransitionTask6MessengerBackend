const express = require("express");
const { getItems, getItemsCollection, postItem, deleteItem, patchItem } = require("../controllers/itemController");

const router = express.Router();

// GET all Item
router.get("/", getItems);

// GET all Item for a user
router.get("/:id", getItemsCollection);

// POST a Item
router.post("/", postItem);

// DELETE a Item
router.delete("/:id", deleteItem);

// UPDATE a Item
router.patch("/:id", patchItem);

module.exports = router;
