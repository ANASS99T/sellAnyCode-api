const categoryController = require('../controllers/categoryController');
const router = require('express').Router();

//middleware
// const checkAdmin = require('../middleware/checkAdmin');
const checkAdmin = require('../middleware/checkAuth');

router.post('/', checkAdmin, categoryController.addCategory);
router.put('/:id',checkAdmin, categoryController.updateCategory);
router.delete('/:id',checkAdmin, categoryController.deleteCategory);
router.get('/id/:id', categoryController.getCategoryById);
router.get('/name/:name', categoryController.getCategoriesByName);
router.get('/', categoryController.getCategories);
router.get(
  '/categories-sub',
  categoryController.getCategoriesWithSubcategories
);

module.exports = router;
