const express = require("express");
const router = express.Router();

const { createUserCtrl } = require("../controllers/auth");

// router.post("login-user", loginUserCtrl);
router.post("/create-user", createUserCtrl);

module.exports = router;
