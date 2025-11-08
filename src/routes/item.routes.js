const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/item.controller');
const { validateItem } = require('../validators/item.validator');

router.post('/items', validateItem, ctrl.createItem);
router.get('/items', ctrl.listItems);
router.get('/items/:id', ctrl.getItem);
router.put('/items/:id', validateItem, ctrl.updateItem);

router.get('/categories/:id/items', ctrl.itemsByCategory);
router.get('/subcategories/:id/items', ctrl.itemsBySubcategory);

router.get('/items/search', ctrl.searchItems);

module.exports = router;
