const express = require("express");
const {
  getCollections,
  getCollectionsUser,
  postCollection,
  deleteCollection,
  patchCollection,
} = require("../controllers/collectionController");

const router = express.Router();

// GET all collection
router.get("/", getCollections);

// GET all collection for a user
router.get("/:id", getCollectionsUser);

// POST a collection
router.post("/", postCollection);

// DELETE a collection
router.delete("/:id", deleteCollection);

// UPDATE a collection
router.patch("/:id", patchCollection);

module.exports = router;
