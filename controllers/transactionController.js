const db = require('../models');
require('dotenv/config');
const { Op } = require('sequelize');

// Main model

// const User = db.users;
const Product = db.products;
const Transaction = db.transations;

// TODO: get user transactions

// *  ==================== START ====================

const userTransactions = async (req, res, next) => {
  const user = req?.user;

  try {
    let transactions = await Transaction.findAll({ where: { user: user } });

    let list = [];

    await Promise.all(
      transactions.map(async (item) => {
        // const user = await User.findOne({
        //   where: { id: item?.user },
        // });
        const product = await Product.findOne({
          where: { id: item?.product },
        });
        const obj = await {
          ...item.dataValues,
          //   user: user,
          product: product,
        };
        await list.push(obj);
      })
    );

    return res.status(201).json({ success: true, transactions: list });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: get user number of success transactions

// *  ==================== START ====================

const successTransactions = async (req, res, next) => {
  const user = req?.user;

  try {
    let transactions = await Transaction.findAll({
      where: { [Op.and]: [{ user: user, status: { [Op.like]: `%success%` } }] },
    });
    return res
      .status(201)
      .json({ success: true, transactionsSize: transactions.length });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Create Success transaction
// *  ==================== Start ====================

const successTransaction = async (req, res) => {
  const user = req?.user;

  const { product, amount, reference } = req.body;

  const data = {
    type: 'Item Purchase',
    status: 'success',
    user: user,
    product: product,
    amount: amount,
    reference: reference,
  };
  try {
    const transaction = await Transaction.create(data);

    return res.status(201).json({
      success: true,
      message: 'transaction created',
      transaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      error: error,
    });
  }
};

// *  ==================== END ====================

// TODO: Create Failed transaction
// *  ==================== Start ====================

const failedTransaction = async (req, res) => {
  const user = req?.user;

  const { product, amount, reference } = req.body;

  const data = {
    type: 'Item Purchase',
    status: 'failed',
    user: user,
    product: product,
    amount: amount,
    reference: reference
  };
  try {
    const transaction = await Transaction.create(data);

    return res.status(201).json({
      success: true,
      message: 'transaction created',
      transaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      error: error,
    });
  }
};

// *  ==================== END ====================

// TODO: Check if user already has the product
// *  ==================== Start ====================

const hasProduct = async (req, res, next) => {
  try {
    const user = req?.user;
    const { product } = req.body;

    const tran = await Transaction.findAll({
      where: {
        [Op.and]: [
          { user: user, status: { [Op.like]: `%success%` }, product: product },
        ],
      },
    });

    if (tran.length > 0) {
      return res.status(200).json({ success: true, hasProduct: true });
    } else {
      return res.status(200).json({ success: true, hasProduct: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error });
  }
};

// *  ==================== END ====================

// TODO: Check if user own the product

// *  ==================== START ====================

const isTheOwner = async (req, res, next) => {
  try {
    const user = req?.user;
    const { product } = req.body;

    const prod = await Product.findOne({
      where: { id: product },
    });

    console.log('user => ', user);
    console.log(prod);
    if (prod.user === user) {
      return res.status(200).json({ success: true, isOwner: true });
    } else {
      return res.status(200).json({ success: true, isOwner: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error });
  }
};

// *  ==================== END ====================

module.exports = {
  userTransactions,
  successTransactions,
  isTheOwner,
  successTransaction,
  failedTransaction,
  hasProduct,
};
