const db = require('../models');
require('dotenv/config');
const fs = require('fs');

// Main model

const Product = db.products;

// TODO: Add product

// *  ==================== START ====================

const addProduct = async (req, res, next) => {
  let data = {
    name: req.body.name,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    features: req.body.features,
    liveDemo: req.body.liveDemo,
    priceSingle: req.body.priceSingle,
    priceMultiple: req.body.priceMultiple,
    category: req.body.category,
    subcategory: req.body.subcategory,
    user: req.body.userId,
    operatingSystems: req.body.operatingSystems
      ? req.body.operatingSystems
      : null,
    filesIncluded: req.body.filesIncluded ? req.body.filesIncluded : null,
    supportedCms: req.body.supportedCms ? req.body.supportedCms : null,
    htmlFrameworks: req.body.htmlFrameworks ? req.body.htmlFrameworks : null,
    jsFrameworks: req.body.jsFrameworks ? req.body.jsFrameworks : null,
    softwareVersions: req.body.softwareVersions
      ? req.body.softwareVersions
      : null,
    softwareFrameworks: req.body.softwareFrameworks
      ? req.body.softwareFrameworks
      : null,
    database: req.body.database ? req.body.database : null,

    icon: req.files.icon,
    preview: req.files.preview,
    screenshot1: req.files.screenshot1 ? req.files.screenshot1 : null,
    screenshot2: req.files.screenshot2 ? req.files.screenshot2 : null,
    screenshot3: req.files.screenshot3 ? req.files.screenshot3 : null,
    screenshot4: req.files.screenshot4 ? req.files.screenshot4 : null,
    screenshot5: req.files.screenshot5 ? req.files.screenshot5 : null,
    screenshot6: req.files.screenshot6 ? req.files.screenshot6 : null,
    screenshot7: req.files.screenshot7 ? req.files.screenshot7 : null,
    screenshot8: req.files.screenshot8 ? req.files.screenshot8 : null,
    mainZip: req.files.mainZip ? req.files.mainZip : null,
  };

  // Create the product

  try {
    const product = await Product.create(data);
    product
      .then((result) => {
        return {
          success: true,
          status: 201,
          message: 'product created',
          product,
        };
      })
      .catch((err) => {
        console.log(err);
        // TODO: Remove all added files in case of error
        data.icon &&
          fs.unlink(`uploads/product/${data.icon.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('icon file deleted successfully');
          });
        data.preview &&
          fs.unlink(`uploads/product/${data.preview.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('preview file deleted successfully');
          });
        data.screenshot1 &&
          fs.unlink(`uploads/product/${data.screenshot1.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('screenshot1 file deleted successfully');
          });
        data.screenshot2 &&
          fs.unlink(`uploads/product/${data.screenshot2.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('screenshot2 file deleted successfully');
          });
        data.screenshot3 &&
          fs.unlink(`uploads/product/${data.screenshot3.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('screenshot3 file deleted successfully');
          });
        data.screenshot4 &&
          fs.unlink(`uploads/product/${data.screenshot4.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('screenshot4 file deleted successfully');
          });
        data.screenshot5 &&
          fs.unlink(`uploads/product/${data.screenshot5.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('screenshot5 file deleted successfully');
          });
        data.screenshot6 &&
          fs.unlink(`uploads/product/${data.screenshot6.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('screenshot6 file deleted successfully');
          });
        data.screenshot7 &&
          fs.unlink(`uploads/product/${data.screenshot7.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('screenshot7 file deleted successfully');
          });
        data.screenshot8 &&
          fs.unlink(`uploads/product/${data.screenshot8.filename}`, (err) => {
            if (err)
              return res.status(403).json({ success: false, error: err });
            console.log('screenshot8 file deleted successfully');
          });
      });
  } catch (error) {
      // console.log(data)
    console.log(error);
    // TODO: Remove all added files in case of error
    data.icon &&
      fs.unlink(`uploads/product/${data.icon[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('icon file deleted successfully');
      });
    data.preview &&
      fs.unlink(`uploads/product/${data.preview[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('preview file deleted successfully');
      });
    data.screenshot1 &&
      fs.unlink(`uploads/product/${data.screenshot1[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('screenshot1 file deleted successfully');
      });
    data.screenshot2 &&
      fs.unlink(`uploads/product/${data.screenshot2[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('screenshot2 file deleted successfully');
      });
    data.screenshot3 &&
      fs.unlink(`uploads/product/${data.screenshot3[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('screenshot3 file deleted successfully');
      });
    data.screenshot4 &&
      fs.unlink(`uploads/product/${data.screenshot4[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('screenshot4 file deleted successfully');
      });
    data.screenshot5 &&
      fs.unlink(`uploads/product/${data.screenshot5[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('screenshot5 file deleted successfully');
      });
    data.screenshot6 &&
      fs.unlink(`uploads/product/${data.screenshot6[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('screenshot6 file deleted successfully');
      });
    data.screenshot7 &&
      fs.unlink(`uploads/product/${data.screenshot7[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('screenshot7 file deleted successfully');
      });
    data.screenshot8 &&
      fs.unlink(`uploads/product/${data.screenshot8[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('screenshot8 file deleted successfully');
      });
    data.mainZip &&
      fs.unlink(`uploads/product/${data.mainZip[0].filename}`, (err) => {
        if (err) return console.log(err);
        console.log('mainZip file deleted successfully');
      });

    return res.status(403).json({ success: false, error: error });
  }
};

// *  ==================== END ====================

// TODO: Update product info without screenshots

// *  ==================== START ====================

// *  ==================== END ====================

// TODO: Update product screenshots

// *  ==================== START ====================

// *  ==================== END ====================

// TODO: Update product main file

// *  ==================== START ====================

// *  ==================== END ====================

// TODO: Get product by Id

// *  ==================== START ====================

// *  ==================== END ====================

// TODO: Get products by category

// *  ==================== START ====================

// *  ==================== END ====================

// TODO: Get products by subcategory

// *  ==================== START ====================

// *  ==================== END ====================

// TODO: Get products by name

// *  ==================== START ====================

// *  ==================== END ====================

// TODO: Get products by user

// *  ==================== START ====================

// *  ==================== END ====================

// TODO: Delete product

// *  ==================== START ====================

// *  ==================== END ====================

module.exports = {
  addProduct,
};
