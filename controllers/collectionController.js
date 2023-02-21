const Collection = require("../models/collectionModel");

////// GET all collections
const getCollections = async (req, res) => {
  const allCollections = await Collection.find({});

  res.status(200).json(allCollections);
};

////// GET all collections for a user
const getCollectionsUser = async (req, res) => {
  const { id } = req.params;

  const collections = await Collection.find({ author: id });

  if (!collections) {
    return res.status(404).json({ error: "No such collections found." });
  }

  res.status(200).json(collections);
};

////// POST new collection
const postCollection = async (req, res) => {
  const { _id, name, description, category, author, image, customFields } = req.body;

  // add collection to db
  try {
    const collection = await Collection.addCollection(_id, name, description, category, author, image, customFields);

    res.status(200).json({ collection });
  } catch (error) {
    res.status(400).json({ error: "Could not post a collection." });
  }
};

////// DELETE a collection
const deleteCollection = async (req, res) => {
  const { id } = req.params;

  const collection = await Collection.findOneAndDelete({ _id: id });

  if (!collection) {
    return res.status(404).json({ error: "No such collection to delete." });
  }
  res.status(200).json(collection);
};

////// PATCH a collection
const patchCollection = async (req, res) => {
  console.log("Patching collection with id of:");
  const { id } = req.params;

  const collection = await Collection.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!collection) {
    return res.status(404).json({ error: "No such collection to update." });
  }
  res.status(200).json(collection);
};

module.exports = {
  getCollections,
  getCollectionsUser,
  postCollection,
  deleteCollection,
  patchCollection,
};
