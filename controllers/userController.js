const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

// TODO: Function to Create Valide Access Token :
const createAccessToken = (user) =>
  jwt.sign({ data: { id: user.id } }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Main model

const User = db.users;

//TODO: Add user
// *  ==================== START ====================
const addUser = async (data) => {
  // ? check if the email already exists?

  const isExist = User.findOne({
    attributes: ['email'],
    where: {
      email: data.email,
    },
  });

  if (isExist && isExist.email === data.email) {
    return { success: false, status: 403, message: 'Email already exists' };
  }

  // TODO: generate a hashed password
  const password = await bcrypt.hash(data.defaultPassword, 10);

  data.password = password;

  //TODO: Create user
  const user = User.create(data);
  return { success: true, status: 201, message: 'User created', user };
};
// *  ==================== END ====================

//TODO: register user => add user, generate token and log the user in
// *  ==================== START ====================
const register = async (req, res) => {
  // TODO: Load data frrom response body
  let data = {
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    defaultPassword: req.body.password,
  };

  // TODO: create the user
  const addedUser = addUser(data);

  addedUser
    .then(function (result) {
      if (result.success) {
        console.log({ done: result });
        // TODO: Generate a token and log the user in
        const token = createAccessToken(result.user);
        res.status(201).json({
          success: true,
          message: 'user created successfully.',
          user: result.user,
          token: token,
        });
      } else {
        res
          .status(result.status)
          .json({ success: false, message: result.message });
      }
    })
    .catch((err) => console.log({ error: err }));
};
// *  ==================== END ====================

// TODO: Login user
// *  ==================== START ====================

const login = async (req, res) => {
  // TODO: Load data frrom response body
  let data = {
    email: req.body.email,
    password: req.body.password,
  };

  // TODO: Check email and password validation
  if (!data.email || !data.password) {
    return res
      .status(403)
      .json({ message: "S'il vous plait donner email ou mot de passe" });
  }

  // ? check if the email already exists?

  const isExist = User.findOne({
    where: {
      email: data.email,
    },
  });

  isExist
    .then((result) => {
      if (result && result.email) {
        // ? Check if password is correct by comparing it the password in database

        if (!( bcrypt.compare(data.password, result.password))) {
          return res.status(403).json({ erreur: 'Incorrect Password' });
        }
      } else {
        return res.status(403).json({ erreur: 'Incorrect Email' });
      }

      // TODO: Generate a token and log the user in
      const token = createAccessToken(result);
      res.status(201).json({
        success: true,
        message: 'user logged in successfully.',
        user: result,
        token: token,
      });
    })
    .catch((err) => {
      console.log({ error: err });
      res.status(403).send({ error: err });
    });
};
// *  ==================== END ====================

module.exports = {
  register,
  login,
};
