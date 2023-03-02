const express = require("express");
const { createUser, getUsers, getUser, loginUser, deleteUser, patchUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.patch("/:id", patchUser);

module.exports = router;
