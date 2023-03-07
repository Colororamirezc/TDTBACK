const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const PartChild = require('../models/partChild');

const getPartChilds = asyncHandler(async (req, res) => {
  const childs = await PartChild.find().exec();
  res.status(201).json(childs);
});

const getPartChildByCourse = asyncHandler(async (req, res) => {
  const childs = await PartChild.aggregate().sortByCount('course');
  res.status(201).json(childs);
});

const savePartChilds = asyncHandler(async (req, res) => {
  const saved = await PartChild.create(req.body);
  res.status(200).send({ message: 'Part saved successfully', part: saved })
})

const getPartsChildsByDate = asyncHandler(async (req, res) => {
  const childs = await PartChild.find({date: req.body.date}).exec();
  res.status(201).json(childs);
});

const bulkSavePartChilds = asyncHandler(async (req, res) => {
  const saved = await PartChild.insertMany(req.body);
  res.status(200).send({ message: 'Part saved successfully', part: saved })
});

const getPartChildById = asyncHandler(async (req, res) => {
  const childs = await PartChild.findById(req.params.id).exec();
  res.status(201).json(childs);
});

const deletePartChild = asyncHandler(async (req, res) => {
  const deleted = await PartChild.findById(req.body.id).remove().exec();
  res.status(200).send({message: 'Part deleted successfully', part: deleted});
})

const updatePartChild = asyncHandler(async (req, res) => {
  const saved = await PartChild.updateOne({_id: req.body.id}, req.body);
  res.status(200).send({ message: 'Part updated successfully', part: saved })
})


module.exports = {
  getPartChilds,
  savePartChilds,
  getPartChildById,
  deletePartChild,
  updatePartChild,
  bulkSavePartChilds,
  getPartChildByCourse,
  getPartsChildsByDate
};
