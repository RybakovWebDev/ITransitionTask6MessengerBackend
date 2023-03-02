const mongoose = require("mongoose");
const { Schema } = mongoose;

const collectionsSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  customFields: { type: Array },
});

collectionsSchema.statics.addCollection = async function (
  _id,
  name,
  description,
  category,
  author,
  image,
  customFields
) {
  const collection = await this.create({ _id, name, description, category, author, image, customFields });
  console.log("Created collection:", collection);
  return collection;
};

const Collection = mongoose.model("collection", collectionsSchema);

module.exports = Collection;
