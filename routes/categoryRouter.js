const categoryController = require('../controllers/categoryController');
const router = require('express').Router();


router.post('/', categoryController.addCategory); 
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/id/:id', categoryController.getCategoryById);
router.get('/name/:name', categoryController.getCategoriesByName);
router.get('/', categoryController.getCategories);
router.get('/categories-sub', categoryController.getCategoriesWithSubcategories);



module.exports = router;
