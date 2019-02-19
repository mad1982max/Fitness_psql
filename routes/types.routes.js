const express = require('express');
const router = express.Router();

const typesController = require('../controllers/types.controller.js');

router.get('/', typesController.showAllTypes);
router.get('/:id', typesController.getTypeById);
router.post('/', typesController.addType);
router.patch('/:id', typesController.updateType);
router.delete('/:id', typesController.deleteType)

module.exports = router;