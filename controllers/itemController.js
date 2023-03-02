const Item = require("../models/itemModel");

const getItems = async (req, res) => {
  const allItems = await Item.find({});

  res.status(200).json(allItems);
};

const getItemsCollection = async (req, res) => {
  const { id } = req.params;

  const items = await Item.find({ collectionID: id });

  if (!items) {
    return res.status(404).json({ error: "No such item found." });
  }

  res.status(200).json(items);
};

const postItem = async (req, res) => {
  const { _id, name, tags, author, collectionID, likes, comments, customFields } = req.body;

  try {
    const item = await Item.addItem(_id, name, tags, author, collectionID, likes, comments, customFields);

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: "Could not post the item." });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  const item = await Item.findOneAndDelete({ _id: id });

  if (!item) {
    return res.status(404).json({ error: "No such item to delete." });
  }
  res.status(200).json(item);
};

const patchItem = async (req, res) => {
  const { id } = req.params;
  console.log("This is the patch item body:", req.body);
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

const searchItems = async (req, res) => {
  const { searchQuery } = req.body;
  const searchResults = await Item.find({ $text: { $search: searchQuery } });

  if (!searchResults) {
    return res.status(404).json({ error: "Search returned no results." });
  }
  res.status(200).json(searchResults);
};

module.exports = {
  getItems,
  getItemsCollection,
  postItem,
  deleteItem,
  patchItem,
  searchItems,
};
