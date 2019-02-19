const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients.controller.js');

router.get('/', clientsController.showAllClients);
router.get('/:id', clientsController.getClientById);
router.post('/', clientsController.addClient);
router.patch('/:id', clientsController.updateClient);
router.delete('/:id', clientsController.deleteClient)

module.exports = router;