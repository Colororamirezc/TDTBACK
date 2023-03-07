const express = require("express");
const router = express.Router();

const { getUsersCtrl,getPart,getPartById,savePart,deletePart,updatePart,bulkSavePart } = require("../controllers/part");

router.get("/users/:area", getUsersCtrl);
router.get("/part", getPart);
router.get("/part/:id", getPartById);
router.post("/save-part", savePart);
router.post("/save-part-bulk", bulkSavePart);
router.delete("/delete-part", deletePart);
router.patch("/update-part", updatePart);

module.exports = router;
