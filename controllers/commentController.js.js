// const Comment = require("../models/commentModel");

// ////// GET all comments
// const getComments = async (req, res) => {
//   const allComments = await Item.find({});

//   res.status(200).json(allComments);
// };

// ////// GET all comments for a user
// const getCommentsUser = async (req, res) => {
//   const { _id } = req.params;

//   const comments = await Item.find({ author: _id });

//   if (!comments) {
//     return res.status(404).json({ error: "No such item found." });
//   }

//   res.status(200).json(comments);
// };

// ////// POST new comment
// const postComment = async (req, res) => {
//   const { _id, name, tags, author, item } = req.body;

//   // add comment to db
//   try {
//     const comment = await Comment.addComment(_id, name, tags, author, item);

//     res.status(200).json({ comment });
//   } catch (error) {
//     res.status(400).json({ error: "Could not post a comment." });
//   }
// };

// ////// DELETE a comment
// const deleteComment = async (req, res) => {
//   const { id } = req.params;

//   const comment = await Comment.findOneAndDelete({ _id: id });

//   if (!comment) {
//     return res.status(404).json({ error: "No such comment to update." });
//   }
//   res.status(200).json(comment);
// };

// ////// PATCH a comment
// const patchComment = async (req, res) => {
//   const { id } = req.params;

//   const comment = await Comment.findOneAndUpdate(
//     { _id: id },
//     {
//       ...req.body,
//     },
//     { new: true }
//   );

//   if (!comment) {
//     return res.status(404).json({ error: "No such comment to delete." });
//   }
//   res.status(200).json(comment);
// };

// module.exports = {
//   getComments,
//   getCommentsUser,
//   postComment,
//   deleteComment,
//   patchComment,
// };
