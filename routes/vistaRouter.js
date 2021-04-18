const express = require('express');
const vistaController = require('../controllers/vistaController');

const router = express.Router();

router.get('/vista', vistaController.productosVista);
router.get('/registrar', vistaController.productosRegistrar);

module.exports = router;