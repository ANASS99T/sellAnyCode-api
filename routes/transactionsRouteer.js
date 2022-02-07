const router = require('express').Router()
const transactionController = require('../controllers/transactionController');

const checkAuth = require('../middleware/checkAuth');



router.get('/userTransactions', checkAuth, transactionController.userTransactions );
router.get('/userTransactions/success', checkAuth, transactionController.successTransactions );




module.exports = router;