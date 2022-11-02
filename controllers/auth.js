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

module.exports = {
  registerUser,
  loginUser,
};
