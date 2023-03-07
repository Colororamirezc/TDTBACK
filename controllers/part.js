const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Part = require('../models/part');

const getUsersCtrl = asyncHandler(async (req, res) => {
  const usersByArea = await User.find({ area: req.params.area }).exec();

  res.status(201).json(usersByArea);
});

const getPart = asyncHandler(async (req, res) => {
  const childs = await Part.find().exec();
  res.status(201).json(childs);
});

const savePart = asyncHandler(async (req, res) => {
  const saved = await Part.create(req.body);
  res.status(200).send({ message: 'Part saved successfully', part: saved })
})
const bulkSavePart = asyncHandler(async (req, res) => {
  console.log(req.body)
  const saved = await Part.insertMany(req.body);
  res.status(200).send({ message: 'Part saved successfully', part: saved })
});

const getPartById = asyncHandler(async (req, res) => {
  const childs = await Part.findById(req.params.id).exec();
  res.status(201).json(childs);
});

const deletePart = asyncHandler(async (req, res) => {
  const deleted = await Part.findById(req.body.id).remove().exec();
  res.status(200).send({ message: 'Part deleted successfully', part: deleted });
})

const updatePart = asyncHandler(async (req, res) => {
  const saved = await Part.updateOne({ _id: req.body.id }, req.body);
  res.status(200).send({ message: 'Part updated successfully', part: saved })
})

module.exports = {
  getUsersCtrl,
  getPart,
  savePart,
  getPartById,
  deletePart,
  updatePart,
  bulkSavePart
};
