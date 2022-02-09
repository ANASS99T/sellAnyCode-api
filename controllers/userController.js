const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const fs = require('fs');
const mail = require('./MailSender');

// TODO: Function to Create Valide Access Token :
const createRefreshToken = (user, role) =>
  jwt.sign({ data: { id: user.id, role: role } }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
const createAccessToken = (id, role) =>
  jwt.sign({ data: { id: id, role: role } }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

// Main model

const User = db.users;
const Whishlist = db.wishlists;
const Product = db.products;

//TODO: Add user
// *  ==================== START ====================
const addUser = async (data) => {
  // ? check if the email already exists?

  const isExist = await User.findOne({
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
  let user = await User.create(data);
  user = user.dataValues;
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
  try {
    const addedUser = await addUser(data);

    if (addedUser.success) {
      const result = addedUser?.user;
      // TODO: Generate a token and log the user in
      const Refreshtoken = createRefreshToken(result, 'user');
      const AccessToken = createAccessToken(result.id, 'user');

      // TODO: Save the token in the cookies

      res.cookie('refresh_token', Refreshtoken, { httpOnly: true });
      res.cookie('access_token', AccessToken, { httpOnly: true });

      res.status(201).json({
        success: true,
        message: 'user created successfully.',
        user: result,
        token: AccessToken,
      });
    } else {
      res
        .status(addedUser.status)
        .json({ success: false, message: addedUser.message });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, error });
  }

  // })
  // .catch((err) => console.log({ error: err }));
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
    .then(async (result) => {
      if (result && result.email) {
        // ? Check if password is correct by comparing it the password in database
        const correctPassword = await bcrypt.compare(
          data.password,
          result.password
        );
        if (!correctPassword) {
          return res.status(403).json({ error: 'Incorrect Password' });
        }
      } else {
        return res.status(403).json({ error: 'Incorrect Email' });
      }

      // TODO: Generate a token and log the user in
      const Refreshtoken = createRefreshToken(result, 'user');
      const AccessToken = createAccessToken(result.id, 'user');

      // TODO: Save the token in the cookies

      res.cookie('refresh_token', Refreshtoken, { httpOnly: true });
      res.cookie('access_token', AccessToken, { httpOnly: true });

      res.status(201).json({
        success: true,
        message: 'user logged in successfully.',
        user: result,
        token: AccessToken,
      });
    })
    .catch((err) => {
      console.log({ error: err });
      res.status(403).send({ error: err });
    });
};
// *  ==================== END ====================

// TODO: Login admin
// *  ==================== START ====================

const loginAdmin = async (req, res) => {
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
    .then(async (result) => {
      if (result && result.email) {
        // ? Check if password is correct by comparing it the password in database
        const correctPassword = await bcrypt.compare(
          data.password,
          result.password
        );
        if (!correctPassword) {
          return res.status(403).json({ error: 'Incorrect Password' });
        }
      } else {
        return res.status(403).json({ error: 'Incorrect Email' });
      }

      // TODO: Generate a token and log the user in
      const Refreshtoken = createRefreshToken(result, 'admin');
      const AccessToken = createAccessToken(result.id, 'admin');

      // TODO: Save the token in the cookies

      res.cookie('refresh_token', Refreshtoken, { httpOnly: true });
      res.cookie('access_token', AccessToken, { httpOnly: true });

      res.status(201).json({
        success: true,
        message: 'user logged in successfully.',
        user: result,
        token: AccessToken,
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
    id: req?.user,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
  };

  // ? check if the id comes from the user is the same in the request?

  // console.log(data.id, )
  if (data.id === req.user) {
    // TODO: Get the user with the id

    const user = User.findOne({ where: { id: data.id } });
    user.then(async (result) => {
      // return console.log(result);
      const user = result;
      // return console.log(user.password)
      // ?  Check if the password and confirm password matches ?

      if (data.newPassword !== data.confirmPassword) {
        return res.status(403).json({
          success: false,
          message: 'password and confirm password do not match',
        });
      }

      // console.log(data);
      // console.log(
      //   'comparing passwords: ',
      //   bcrypt.compare(data.oldPassword, result.password)
      // );
      // return console.log(data.oldPassword, user.password)
      // ? Check if oldPassword and user password matches ?
      if (await !bcrypt.compare(data.oldPassword, user.password)) {
        return res
          .status(403)
          .json({ error: 'your old password in incorrect!' });
      } else {
        // TODO: hash the new password and updata the password of the user

        const hashed = bcrypt.hash(data.newPassword, 10);
        hashed
          .then((data) => {
            const newData = User.update(
              { password: data },
              { where: { id: user.id } }
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
  // ? Check if the user exists and the email is valid
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    // user
    // .then((result) => {
    if (email === user.email) {
      // TODO: Create a one time link that is valid for 5 minutes

      // create a unique secret for the user with the jwt secret and user's password
      const secret = process.env.JWT_SECRET + user.password;

      const payload = {
        email: user.email,
        id: user.id,
      };

      // Generate a token

      const token = jwt.sign(payload, secret, { expiresIn: '5m' });

      // Example of link : http://localost:5000/152{user_id}/qweqweqweqweqwe{token}
      const link = process.env.LINK + `/reset-password/${user.id}/${token}`;

      console.log(link);

      // TODO: Send the link to the user by email
      mail(
        email,
        'Reset your password',
        `You can use the link bellow to reset your password: <${link}> By clicking the link you will be redirected to the website where you can enter a new password and to confirm it.
        Thank you for using our service`
      );

      return res.status(201).json({
        success: true,
        message: 'Reset link generated successfully',
        link: link,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log({ error: error });
  }
  // })
  // .catch((err) => {
  //   console.log({ error: err });
  //   next();
  // });
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
  const { id, password, confirmPassword, token } = req.body;

  // TODO: Check the user existance
  try {
    const user = await User.findOne({ where: { id: id } });
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
        // const token = token;
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
      return res.status(403).json({ success: false, message: 'Invalid user' });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, error: err });
  }
};

// *  ==================== END ====================

// TODO: Update user info

// *  ==================== Start ====================

const updateUser = async (req, res, next) => {
  const id = req?.user;

  // console.log(id)
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
    const user = await User.update({ ...req.body }, { where: { id: id } });

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
  const id = req.user;

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

// TODO : Generate access token

// *  ==================== Start ====================

const generateToken = async (req, res, next) => {
  // console.log('this is it : ',req.cookies);
  const token = req.cookies?.refresh_token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ message: 'your token is not valid, please re login' });
      } else {
        const AccessToken = createAccessToken(
          decoded?.data?.id,
          decoded?.data?.role
        );
        res.cookie('access_token', AccessToken, { httpOnly: true });
        return res.status(201).json({ success: true, user: decoded?.data?.id });
      }
    });
  } else {
    // console.log('the error : ' , token);
    return res.status(201).json({
      success: false,
      error: 'your token is not valid, please re login',
    });
  }
};

// *  ==================== END ====================

// TODO : Log out

// *  ==================== Start ====================

const logOut = async (req, res, next) => {
  res.clearCookie('refresh_token');
  res.clearCookie('access_token');
  return res
    .status(200)
    .json({ success: true, message: 'logged out successfully' });
};

// *  ==================== END ====================

// TODO: Get loggedIn user info:

// *  ==================== START ====================

const getLoggedInUser = async (req, res) => {
  const id = req?.user;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    return res.status(201).json({ sucess: true, user });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ sucess: false, error: error });
  }
};

//** Whislist **/
// TODO: Get whishlist by user
// *  ==================== START ====================

const getWhishlistByUser = async (req, res, next) => {
  const user = req.user;

  try {
    let wishlistprod = await Whishlist.findAll({
      where: { user: user },
    });
    // console.log(whislistprod)
    let list = [];
    await Promise.all(
      wishlistprod.map(async (wishlistprod) => {
        // update user id to user info
        let defaultUser = await User.findOne({
          where: { id: wishlistprod.user },
        });
        defaultUser = defaultUser.dataValues;
        let user = {
          fullName: defaultUser.fullName,
          username: defaultUser.username,
          email: defaultUser.email,
        };

        wishlistprod.user = user;
        // update produit id to produit info
        let product = await Product.findOne({
          where: { id: wishlistprod.product },
        });
        product = product.dataValues;

        const obj = await {
          ...wishlistprod.dataValues,
          user: user,
          product: product,
        };
        await list.push(obj);
      })
    );

    return res.status(201).json({ success: true, wishlistprod: list });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error });
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
  loginAdmin,
  generateToken,
  logOut,
  getLoggedInUser,
  getWhishlistByUser,
};
