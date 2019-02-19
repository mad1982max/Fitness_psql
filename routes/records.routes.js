const express = require('express');
const router = express.Router();

const recordsController = require('../controllers/records.controller.js');

router.get('/', recordsController.showAllRecords);
router.get('/:id', recordsController.getRecordById);
router.post('/', recordsController.addRecord);
router.patch('/:id', recordsController.updateRecord);
router.delete('/:id', recordsController.deleteRecord)

module.exports = router;