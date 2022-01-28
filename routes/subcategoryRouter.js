const subcategoryController = require('../controllers/subcategoryController');
const router = require('express').Router();


router.post('/', subcategoryController.addSubcategory); 
router.put('/:id', subcategoryController.updateSubcategory);
router.delete('/:id', subcategoryController.deleteSubcategory);
router.get('/:id', subcategoryController.getSubcategoryById);
router.get('/name/:name', subcategoryController.getSubcategoriesByName);
router.get('/', subcategoryController.getSubcategories);
router.get('/category/:category', subcategoryController.getSubcategoriesByCategory);



module.exports = router;
