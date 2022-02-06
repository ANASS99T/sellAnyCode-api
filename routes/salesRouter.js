const router = require('express').Router()
const salesController = require('../controllers/SalesController');

const checkAuth = require('../middleware/checkAuth');


router.post('/checkSales',checkAuth, salesController.checkSales);
router.get('/sold',checkAuth, salesController.SoldProduct);

module.exports = router;