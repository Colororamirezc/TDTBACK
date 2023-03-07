const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const registerUser = asyncHandler(async (req, res) => {
  const { name, lastName, grade, specialty, administrativePermission, FLA, role, rut, area, password } = req.body

  if (!name || !rut || !password) {
    res.status(400);
    throw new Error('Petición errónea');
  }
  const userExists = await User.findOne({ rut });

  if (userExists) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }

  const salt = bcrypt.genSaltSync();
  const encryptPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name,
    lastName,
    grade,
    specialty,
    administrativePermission,
    FLA,
    role,
    rut,
    area,
    encryptPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      lastName: user.lastName,
      grade: user.grade,
      specialty: user.specialty,
      administrativePermission: user.administrativePermission,
      FLA: user.FLA,
      role: user.role,
      rut: user.rut,
      area: user.area,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Usuario inválido');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { rut, password } = req.body;

  const user = await User.findOne({ rut });

  if (user && (await bcrypt.compare(password, user.encryptPassword))) {
    res.json({
      _id: user.id,
      name: user.name,
      lastName: user.lastName,
      grade: user.grade,
      specialty: user.specialty,
      administrativePermission: user.administrativePermission,
      FLA: user.FLA,
      role: user.role,
      rut: user.rut,
      area: user.area,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3h',
  });
};

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({_id: req.body.id});
  res.status(200).send(user);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().exec();
  res.status(201).json(users);
})

const getUserById = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id).exec();
  res.status(201).json(users);
})

const getUserByArea = asyncHandler(async (req, res) => {
  const users = await User.find().where('area').equals(req.params.area).exec();
  res.status(201).json(users);
})

const deleteUser = asyncHandler(async (req, res) => {
  const deleted = await User.findById(req.body.id).remove().exec();
  res.status(200).send({ message: 'User deleted successfully', user: deleted });
});

const updateUser = asyncHandler(async (req, res) => {
  const saved = await User.updateOne({ _id: req.body.id }, {
    name: req.body.name,
    lastName: req.body.lastName,
    rut: req.body.rut,
    grade: req.body.grade,
    specialty: req.body.specialty,
    administrativePermission: req.body.administrativePermission,
    FLA: req.body.FLA,
    area: req.body.area,
    role: req.body.role
  });
  res.status(200).send({ message: 'User updated successfully', user: saved })
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  changePassword,
  getUserByArea
};
