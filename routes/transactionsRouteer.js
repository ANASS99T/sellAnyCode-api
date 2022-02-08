const router = require('express').Router()
const transactionController = require('../controllers/transactionController');

const checkAuth = require('../middleware/checkAuth');



router.get('/userTransactions', checkAuth, transactionController.userTransactions );
router.get('/userTransactions/success', checkAuth, transactionController.successTransactions );
router.post('/isOwner', checkAuth, transactionController.isTheOwner );
router.post('/successTransaction', checkAuth, transactionController.successTransaction );
router.post('/failedTransaction', checkAuth, transactionController.failedTransaction );
router.post('/hasProduct', checkAuth, transactionController.hasProduct );




module.exports = router;