const express = require("express");
const router = express.Router();

const { getUsersCtrl } = require("../controllers/part");

router.get("/users/:area", getUsersCtrl);

module.exports = router;
