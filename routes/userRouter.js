const userController = require("../controllers/userController")
const router = require('express').Router()

//middleware
const checkAuth = require('../middleware/checkAuth');


router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/:id', userController.getUserById)
router.put('/password', checkAuth, userController.updatePassword)
router.post('/reset-password', userController.forgetPassword)
router.get('/reset-password/:id/:token', userController.ResetPasswordCheckUser)
router.put('/reset-password/', userController.ResetPassword)


module.exports = router


