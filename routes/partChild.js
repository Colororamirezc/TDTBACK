const express = require("express");
const router = express.Router();

const { getPartChilds, savePartChilds, getPartChildById, deletePartChild,updatePartChild, bulkSavePartChilds, getPartChildByCourse
,getPartsChildsByDate } = require("../controllers/partChild");

router.get("/part-child", getPartChilds);
router.get("/part-child/:id", getPartChildById);
router.post("/save-partchild", savePartChilds);
router.post("/bulk-save-partchild", bulkSavePartChilds)
router.delete("/delete-partchild", deletePartChild)
router.patch("/update-partchild", updatePartChild)
router.get('/part-child-course', getPartChildByCourse)
router.post('/part-child-date', getPartsChildsByDate)

module.exports = router;
