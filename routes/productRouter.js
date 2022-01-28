const productController = require('../controllers/productController');
const router = require('express').Router();
const path = require('path');
//middleware
const checkAuth = require('../middleware/checkAuth');

// Using multer

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/product');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '_' + file.originalname);
  },
});

//   a filter for images
const fileFilter = (req, file, cb) => {
  // Accpet file
  if (file.fieldname === 'mainZip') {
    if (file.mimetype === 'application/zip') {
      cb(null, true);
    } else {
      // Reject file
      cb(new Error('file type not supported'), false);
    }
  } else if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    // Reject file
    cb(new Error('file type not supported'), false);
  }
};

const upload = multer({
  storage: storage,

  fileFilter: fileFilter,
});


router.post(
  '/add-product',
  upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'preview', maxCount: 1 },
    { name: 'screenshot1', maxCount: 1 },
    { name: 'screenshot2', maxCount: 1 },
    { name: 'screenshot3', maxCount: 1 },
    { name: 'screenshot4', maxCount: 1 },
    { name: 'screenshot5', maxCount: 1 },
    { name: 'screenshot6', maxCount: 1 },
    { name: 'screenshot7', maxCount: 1 },
    { name: 'screenshot8', maxCount: 1 },
    { name: 'mainZip', maxCount: 1 },
  ]),
  productController.addProduct
);

module.exports = router;
