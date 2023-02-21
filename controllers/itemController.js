const Item = require("../models/itemModel");

////// GET all items
const getItems = async (req, res) => {
  const allItems = await Item.find({});

  res.status(200).json(allItems);
};

////// GET all items for a collectionID
const getItemsCollection = async (req, res) => {
  const { id } = req.params;
  console.log("Looking for items with this collection id", id);
  const items = await Item.find({ collectionID: id });
  console.log("Found those:", items);
  if (!items) {
    return res.status(404).json({ error: "No such item found." });
  }

  res.status(200).json(items);
};

////// POST new item
const postItem = async (req, res) => {
  const { _id, name, tags, author, collectionID, likes, comments, customFields } = req.body;
  console.log("Some data recieved:", name, author, collectionID);
  // add item to db
  try {
    const item = await Item.addItem(_id, name, tags, author, collectionID, likes, comments, customFields);

    res.status(200).json({ item });
  } catch (error) {
    res.status(400).json({ error: "Could not post the item." });
  }
};

////// DELETE a item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  const item = await Item.findOneAndDelete({ _id: id });

  if (!item) {
    return res.status(404).json({ error: "No such item to delete." });
  }
  res.status(200).json(item);
};

////// PATCH a item
const patchItem = async (req, res) => {
  const { id } = req.params;

  const item = await Item.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!item) {
    return res.status(404).json({ error: "No such item to update." });
  }
  res.status(200).json(item);
};

module.exports = {
  getItems,
  getItemsCollection,
  postItem,
  deleteItem,
  patchItem,
};
