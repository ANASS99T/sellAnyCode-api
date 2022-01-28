const userController = require('../controllers/userController');
const router = require('express').Router();

//middleware
const checkAuth = require('../middleware/checkAuth');

// Using multer

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/avatar');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '_' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accpet file
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
    cb(null, true);
  // Reject file
  else cb(new Error('file type not supported'), false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);
router.put('/password', checkAuth, userController.updatePassword);
router.post('/reset-password', userController.forgetPassword);
router.get('/reset-password/:id/:token', userController.ResetPasswordCheckUser);
router.put('/reset-password/', userController.ResetPassword);
router.put('/:id', checkAuth, userController.updateUser);
router.delete('/:id', checkAuth, userController.deleteAccount);
router.put(
  '/avatar/:id',
  checkAuth,
  upload.single('avatar'),
  userController.updateAvatar
);

module.exports = router;
