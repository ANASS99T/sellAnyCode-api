const router = require('express').Router()
const salesController = require('../controllers/SalesController');

const checkAuth = require('../middleware/checkAuth');


router.post('/checkSales',checkAuth, salesController.checkSales);

module.exports = router;