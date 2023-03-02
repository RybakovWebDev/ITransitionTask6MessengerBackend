const express = require("express");
const {
  getItems,
  getItemsCollection,
  postItem,
  deleteItem,
  patchItem,
  searchItems,
} = require("../controllers/itemController");

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItemsCollection);
router.post("/", postItem);
router.delete("/:id", deleteItem);
router.patch("/:id", patchItem);
router.post("/search", searchItems);

module.exports = router;
