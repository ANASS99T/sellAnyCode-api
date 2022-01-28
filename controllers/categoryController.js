const db = require('../models');
require('dotenv/config');
const { Op } = require('sequelize');

// Main model

const Category = db.categories;
const Subcategory = db.subcategories;

// TODO: Add category

// *  ==================== START ====================

const addCategory = async (req, res, next) => {
  const data = {
    name: req.body.name,
  };
  try {
    const category = await Category.create(data);
    return res.status(201).json({
      success: true,
      message: 'Category added successfully',
      category,
    });
  } catch (error) {
    return res.status(403).json({ success: false, error: error });
  }
};

// *  ==================== END ====================

// TODO: Update category

// *  ==================== START ====================

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Category.update(req.body, { where: { id: id } });
    return res
      .status(201)
      .json({ success: true, message: 'Category updated successfully' });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Delete category

// *  ==================== START ====================

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { id: id } });
    return res
      .status(201)
      .json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Get category By ID

// *  ==================== START ====================

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ where: { id: id } });
    return res.status(201).json({ success: true, category });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Get category by name

// *  ==================== START ====================

const getCategoriesByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const categories = await Category.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    return res.status(201).json({ success: true, categories });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Get All Categories

// *  ==================== START ====================

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    return res.status(201).json({ success: true, categories });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

// TODO: Get All Categories with subcategories

// *  ==================== START ====================

const getCategoriesWithSubcategories = async (req, res, next) => {
  try {
    let categories = await Category.findAll();

    let list = [];

    await Promise.all(
      categories.map(async (category) => {
          
        const subcategories = await Subcategory.findAll({
          where: { category: category.dataValues.id },
        });
        const obj = await {
          ...category.dataValues,
          subcategories: subcategories,
        };
        await list.push(obj);
      })
    );

    return res.status(201).json({ success: true, categories: list });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: 'An error occurred!' });
  }
};

// *  ==================== END ====================

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategoriesByName,
  getCategories,
  getCategoriesWithSubcategories,
};
