const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUsers, getUserById, deleteUser, updateUser, changePassword, getUserByArea } = require("../controllers/auth");

router.post("/create-user", registerUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/users-area/:area", getUserByArea);
router.delete("/delete-user", deleteUser);
router.put("/update-user", updateUser);
router.put("/change-password", changePassword)

module.exports = router;
