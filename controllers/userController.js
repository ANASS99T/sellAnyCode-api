const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const fs = require('fs');

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

        if (!bcrypt.compare(data.password, result.password)) {
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

// TODO: Get user by ID:

// *  ==================== START ====================

const getUserById = async (req, res) => {
  const user = User.findOne({
    where: {
      id: req.params.id,
    },
  });

  user
    .then((result) => {
      res.status(201).json({ sucess: true, user: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({ sucess: false, error: err });
    });
};

// *  ==================== END ====================

// TODO: Update password
// *  ==================== START ====================

const updatePassword = async (req, res) => {
  // Get data from request body
  let data = {
    id: req.body.id,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
  };

  // ? check if the id comes from the user is the same in the request?

  if (data.id === req.userId) {
    // TODO: Get the user with the id

    const user = User.findOne({ where: { id: data.id } });
    user.then((result) => {
      // ?  Check if the password and confirm password matches ?

      if (data.newPassword !== data.confirmPassword) {
        return res.status(403).json({
          success: false,
          message: 'password and confirm password do not match',
        });
      }

      console.log(data);
      console.log(
        'comparing passwords: ',
        bcrypt.compare(data.oldPassword, result.password)
      );
      // ? Check if oldPassword and user password matches ?
      if (!bcrypt.compare(data.oldPassword, result.password)) {
        return res
          .status(403)
          .json({ erreur: 'your old password in incorrect!' });
      } else {
        // TODO: hash the new password and updata the password of the user

        const hashed = bcrypt.hash(data.newPassword, 10);
        hashed
          .then((data) => {
            const newData = User.update(
              { password: data },
              { where: { id: result.id } }
            );

            newData
              .then((data) => {
                return res.status(201).json({
                  success: true,
                  message: 'Password updated successfully',
                });
              })
              .catch((err) => {
                console.log(err);
                return res.status(403).json({ success: false, error: err });
              });
          })
          .catch((err) => {
            console.log(err);
            return res.status(403).json({ success: false, error: err });
          });
      }
    });
  } else {
    return res
      .status(403)
      .json({ success: false, message: 'User ID not match!' });
  }
};

// *  ==================== END ====================

// TODO: Generate Magic Link to reset password and send to the user by email
// *  ==================== START ====================

const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  // ? Check if the user exists and the email is valid

  const user = User.findOne({ where: { email: email } });
  user
    .then((result) => {
      if (email === result.email) {
        // TODO: Create a one time link that is valid for 5 minutes

        // create a unique secret for the user with the jwt secret and user's password
        const secret = process.env.JWT_SECRET + result.password;

        const payload = {
          email: result.email,
          id: result.id,
        };

        // Generate a token

        const token = jwt.sign(payload, secret, { expiresIn: '5m' });

        // Example of link : http://localost:5000/152{user_id}/qweqweqweqweqwe{token}
        const link = process.env.LINK + `/reset-password/${result.id}/${token}`;

        console.log(link);

        // TODO: Send the link to the user by email

        return res.status(201).json({
          success: true,
          message: 'Reset link generated successfully',
          link: link,
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log({ error: err });
      next();
    });
};

// *  ==================== END ====================

// TODO: Verify the user id and the token to reset the password

// *  ==================== START ====================

const ResetPasswordCheckUser = async (req, res, next) => {
  const { id, token } = req.params;

  // TODO: Check if the id exists in database

  const user = User.findOne({ where: { id: id } });
  user
    .then((result) => {
      if (result.id === id) {
        // Generating the secret to verify the token
        const secret = process.env.JWT_SECRET + result.password;

        try {
          // Verifying the token
          const payload = jwt.verify(token, secret);

          console.log(payload);

          return res.status(200).json({ success: true });
        } catch (error) {
          console.log(error);
        }
        return res.status(403).json({ success: false, error });
      } else {
        return res
          .status(403)
          .json({ success: false, message: 'User not exists' });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(403).json({ success: false, error: err });
    });
};

// *  ==================== END ====================

// TODO: Reset password (Forget Password)

// *  ==================== START ====================

const ResetPassword = async (req, res) => {
  const { id, password, confirmPassword } = req.body;

  // TODO: Check the user existance

  const user = User.findOne({ where: { id: id } });
  user
    .then((user) => {
      if (user.id === id) {
        // ? check if password and confirm password matches

        if (password !== confirmPassword) {
          return res.status(403).json({
            success: false,
            message: 'password and confirm password not match',
          });
        }

        // Generating the secret to verify the token
        const secret = process.env.JWT_SECRET + user.password;

        try {
          const token = req.headers.authorization.split(' ')[1];
          // Verifying the token
          const payload = jwt.verify(token, secret);

          // TODO: hash the password

          const hash = bcrypt.hash(password, 10);

          hash.then((pass) => {
            User.update({ password: pass }, { where: { id: id } });
            return res
              .status(200)
              .json({ success: true, message: 'password reset successfully' });
          });
        } catch (error) {
          console.log(error);
          return res.status(403).json({ success: false, error });
        }
      } else {
        return res
          .status(403)
          .json({ success: false, message: 'Invalid user' });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({ success: false, error: err });
    });
};

// *  ==================== END ====================

// TODO: Update user info

// *  ==================== Start ====================

const updateUser = async (req, res, next) => {
  const { id } = req.params;

  // !prevent updating avatar, id, income, whidraw

  if (
    req.body.hasOwnProperty('avatar') ||
    req.body.hasOwnProperty('id') ||
    req.body.hasOwnProperty('income') ||
    req.body.hasOwnProperty('whidraw')
  ) {
    return res.status(403).json({
      success: false,
      message: "you are tring to update something that you can't updat ",
    });
  }

  try {
    const user = await User.update(req.body, { where: { id: id } });

    return res
      .status(201)
      .json({ success: true, message: 'user updated successfully' });
  } catch {
    (err) => {
      console.log(err);
      return res.status(403).json({ success: false, error: err });
    };
  }
};

// *  ==================== END ====================

// TODO: Update user avatar

// *  ==================== Start ====================

const updateAvatar = async (req, res, next) => {
  const { id } = req.params;

  // ? check if the user exists :

  const isExist = await User.findOne({ where: { id: id } });

  if (isExist && isExist.id === id) {
    try {
      // TODO: if no file uploaded update the avatar with null
      if (req.file === undefined) {
        // TODO: Remove previous image from the Server
        isExist.avatar !== null &&
          fs.unlink(`uploads/avatar/${isExist.avatar}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('file deleted successfully');
          });

        await User.update({ avatar: null }, { where: { id: id } });
        return res
          .status(201)
          .json({ success: true, message: 'avatar successfully' });
      }

      await User.update({ avatar: req.file.filename }, { where: { id: id } });

      // TODO: Remove previous image from the Server
      isExist.avatar !== null &&
        fs.unlink(`uploads/avatar/${isExist.avatar}`, (err) => {
          if (err) return res.status(403).json({ success: false, error: err });
          console.log('file deleted successfully');
        });

      return res
        .status(201)
        .json({ success: true, message: 'avatar successfully' });
    } catch {
      (err) => {
        console.log(err);
        return res.status(403).json({ success: false, error: err });
      };
    }
  } else {
    fs.unlink(`uploads/avatar/${req.file.filename}`, (err) => {
      if (err) return res.status(403).json({ success: false, error: err });
      console.log('file deleted successfully');
    });

    return res.status(403).json({ success: false, message: 'Not valid ID' });
  }

  // throw "Testing error"
};

// *  ==================== END ====================

// TODO : Delete account

// *  ==================== Start ====================

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    await User.destroy({ where: { id: id } });

    return res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' });
  } catch {
    (err) => {
      console.log(err);
      return res.status(403).json({ success: false, error: err });
    };
  }
};

// *  ==================== END ====================


module.exports = {
  register,
  login,
  getUserById,
  updatePassword,
  forgetPassword,
  ResetPasswordCheckUser,
  ResetPassword,
  updateUser,
  deleteAccount,
  updateAvatar,
};
