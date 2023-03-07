const asyncHandler = require('express-async-handler');
const Reason = require('../models/reason');

const getReason = asyncHandler(async (req, res) => {
  const childs = await Reason.find().exec();
  res.status(201).json(childs);
});

const saveReason = asyncHandler(async (req, res) => {
  const saved = await Reason.create(req.body);
  res.status(200).send({ message: 'Reason saved successfully', reason: saved })
})

const getReasonById = asyncHandler(async (req, res) => {
  const childs = await Reason.findById(req.params.id).exec();
  res.status(201).json(childs);
});

const deleteReason = asyncHandler(async (req, res) => {
  const deleted = await Reason.findById(req.body.id).remove().exec();
  res.status(200).send({ message: 'Reason deleted successfully', reason: deleted });
})

const updateReason = asyncHandler(async (req, res) => {
  const saved = await Reason.updateOne({ _id: req.body.id }, req.body);
  res.status(200).send({ message: 'Reason updated successfully', reason: saved })
})

module.exports = {
  getReason,
  saveReason,
  getReasonById,
  deleteReason,
  updateReason
};
