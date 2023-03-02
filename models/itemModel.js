const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemsSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    tags: { type: Array, required: true },
    author: { type: String, required: true },
    collectionID: { type: String, required: true },
    likes: { type: Array },
    comments: { type: Array },
    customFields: { type: Object },
  },
  { minimize: false }
);

itemsSchema.statics.addItem = async function (_id, name, tags, author, collectionID, likes, comments, customFields) {
  const item = await this.create({ _id, name, tags, author, collectionID, likes, comments, customFields });
  console.log("Created item:", item);
  return item;
};

const Item = mongoose.model("item", itemsSchema);

module.exports = Item;
