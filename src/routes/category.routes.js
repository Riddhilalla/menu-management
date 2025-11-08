const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { validateCategory, validateCategoryUpdate } = require('../validators/category.validator');

// create
router.post('/', validateCategory, controller.createCategory);
// list
router.get('/', controller.listCategories);
// get by id or name
router.get('/:idOrName', controller.getCategory);
// update (partial updates allowed) — use update validator
router.put('/:id', validateCategoryUpdate, controller.updateCategory);

module.exports = router;
