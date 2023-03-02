const express = require("express");
const {
  getCollections,
  getCollectionsUser,
  postCollection,
  deleteCollection,
  patchCollection,
} = require("../controllers/collectionController");

const router = express.Router();

router.get("/", getCollections);
router.get("/:id", getCollectionsUser);
router.post("/", postCollection);
router.delete("/:id", deleteCollection);
router.patch("/:id", patchCollection);

module.exports = router;
