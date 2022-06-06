const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asynchandler = require('express-async-handler');
const POSTUSER = require('../models/postuserModel');

const registerpostUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const postuserExists = await POSTUSER.findOne({ email });
  if (postuserExists) {
    res.status(400);
    throw new Error('Postuser already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const postuser = await POSTUSER.create({
    name,
    email,
    password: hashedPassword,
  });

  if (postuser) {
    res.status(201).json({
      _id: postuser.id,
      name: postuser.name,
      email: postuser.email,
      token: generateToken(postuser._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid postuser');
  }
});

const loginpostUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const postuser = await POSTUSER.findOne({ email });

  if (postuser && (await bcrypt.compare(password, postuser.password))) {
    res.json({
      _id: postuser._id,
      name: postuser.name,
      email: postuser.email,
      token: generateToken(postuser._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const getMe = asynchandler(async (req, res) => {});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  registerpostUser,
  loginpostUser,
  getMe,
};
