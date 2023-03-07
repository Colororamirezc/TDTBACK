const express = require("express");
const router = express.Router();

const { getReason,saveReason,getReasonById,deleteReason,updateReason } = require("../controllers/reason");

router.get("/reason", getReason);
router.get("/reason/:id", getReasonById);
router.post("/save-reason", saveReason);
router.delete("/delete-reason", deleteReason);
router.put("/update-reason", updateReason);

module.exports = router;
