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

    let list = [];

    // await Promise.all(
    //   transactions.map(async (item) => {
    //     // const user = await User.findOne({
    //     //   where: { id: item?.user },
    //     // });
    //     const product = await Product.findOne({
    //       where: { id: item?.product },
    //     });
    //     const obj = await {
    //       ...item.dataValues,
    //       //   user: user,
    //       product: product,
    //     };
    //     await list.push(obj);
    //   })
    // );

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

// TODO: made transaction with status false by default

// *  ==================== START ====================

// const makeTransaction = async (req, res, next) => {
//     try {
//       let categories = await Category.findAll();

//       let list = [];

//       await Promise.all(
//         categories.map(async (category) => {

//           const subcategories = await Subcategory.findAll({
//             where: { category: category.dataValues.id },
//           });
//           const obj = await {
//             ...category.dataValues,
//             subcategories: subcategories,
//           };
//           await list.push(obj);
//         })
//       );

//       return res.status(201).json({ success: true, categories: list });
//     } catch (error) {
//       console.log(error);
//       return res
//         .status(403)
//         .json({ success: false, error: 'An error occurred!' });
//     }
//   };

// *  ==================== END ====================

module.exports = {
  userTransactions,
  successTransactions,
};
