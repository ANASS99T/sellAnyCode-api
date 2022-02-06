const db = require('../models');
const { Op } = require('sequelize');
const Sales = db.sales;
const Product = db.products;
// TODO: check if the user has the item

// *  ==================== START ====================

const checkSales = async (req, res, next) => {
  const user = req?.user;
  const id = req.body?.product;

  console.log(user);
  console.log(id);
  try {
    const sale = await Sales.findAll({
      where: {
        [Op.and]: [{ product: id }, { user: user }],
      },
    });
    // console.log('--------------------' + sale.length);
    if (sale.length > 0) {
      return res.status(201).json({ success: true, sale: true });
    } else {
      return res.status(201).json({ success: true, sale: false });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: get sold products but user

// *  ==================== START ====================

const SoldProduct = async (req, res, next) => {
  const user = req?.user;
  // console.log(user);

  try {
    const productsId = [];
    const products = [];
    const sales = await Sales.findAll({
      where: {
        [Op.and]: [{ user: user }],
      },
    });
    await Promise.all(
      sales.map(async (item, index) => {
        await productsId.push(item?.product);
      })
    );

    // console.log(products)
    await Promise.all(
      productsId.map(async (item, index) => {
        const product = await Product.findOne({ where: { id: item } });
        await products.push(product);
      })
    );

    // console.log(products)
    return res.status(201).json({ success: true, products: products });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

module.exports = {
  checkSales,
  SoldProduct,
};
