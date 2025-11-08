const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/subcategory.controller');
const { validateSubcategory } = require('../validators/subcategory.validator');

// create under a category
router.post('/categories/:categoryId/subcategories', validateSubcategory, ctrl.createSubcategory);

// generic subcategory routes
router.get('/subcategories', ctrl.listSubcategories);
router.get('/subcategories/:id', ctrl.getSubcategory);
router.put('/subcategories/:id', validateSubcategory, ctrl.updateSubcategory);

module.exports = router;
