const db = require('../models');
require('dotenv/config');
const { Op } = require('sequelize');

// Main model

const Subcategory = db.subcategories;
const Category = db.categories;

// TODO: Add Subcategory

// *  ==================== START ====================

const addSubcategory = async (req, res, next) => {
  const data = {
    name: req.body.name,
    category: req.body.category,
  };
  try {
    const subcategory = await Subcategory.create(data);
    return res.status(201).json({
      success: true,
      message: 'subcategory added successfully',
      subcategory,
    });
  } catch (error) {
    return res.status(403).json({ success: false, error: error });
  }
};

// *  ==================== END ====================

// TODO: Update subcategory

// *  ==================== START ====================

const updateSubcategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Subcategory.update(req.body, { where: { id: id } });
    return res
      .status(201)
      .json({ success: true, message: 'subCategory updated successfully' });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Delete subcategory

// *  ==================== START ====================

const deleteSubcategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Subcategory.destroy({ where: { id: id } });
    return res
      .status(201)
      .json({ success: true, message: 'SubCategory deleted successfully' });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Get Subcategory By ID

// *  ==================== START ====================

const getSubcategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let subcategory = await Subcategory.findOne({ where: { id: id } });
    const category = await Category.findOne({
      where: { id: subcategory.category },
    });

    subcategory.category = category;

    return res.status(201).json({ success: true, subcategory });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Get subcategory by name

// *  ==================== START ====================

const getSubcategoriesByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    let subcategories = await Subcategory.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });

    let list = [];
    await Promise.all(
      subcategories.map(async (subcategory) => {
        const category = await Category.findOne({
          where: { id: subcategory.category },
        });
        const obj = await {
          ...subcategory.dataValues,
          category: category.dataValues,
        };
        await list.push(obj);
      })
    );

    return res.status(201).json({ success: true, subcategories: await list });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Get All Subcategories

// *  ==================== START ====================

const getSubcategories = async (req, res, next) => {
  try {
    let subcategories = await Subcategory.findAll();

    let list = [];
    await Promise.all(
      subcategories.map(async (subcategory) => {
        const category = await Category.findOne({
          where: { id: subcategory.category },
        });
        const obj = await {
          ...subcategory.dataValues,
          category: category.dataValues,
        };
        await list.push(obj);
      })
    );


    return res.status(201).json({ success: true, subcategories: list });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Get All Subcategories by category

// *  ==================== START ====================

const getSubcategoriesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    let subcategories = await Subcategory.findAll({
      where: { category: category },
    });

    subcategories.map(async (subcategory) => {
      const category = await Category.findOne({
        where: { id: subcategory.category },
      });
      subcategory.category = category;
    });

    return res.status(201).json({ success: true, subcategories });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

module.exports = {
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoryById,
  getSubcategoriesByName,
  getSubcategories,
  getSubcategoriesByCategory,
};
