const router = require('express').Router()
const salesController = require('../controllers/SalesController');

const checkAuth = require('../middleware/checkAuth');


router.post('/checkSales',checkAuth, salesController.checkSales);
router.get('/sold',checkAuth, salesController.SoldProduct);
router.get('/userSelsSize',checkAuth, salesController.SalesSize);

module.exports = router;