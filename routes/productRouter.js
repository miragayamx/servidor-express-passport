const express = require('express');
const productControler = require('../controllers/productController');
const upload = require('../middleware/multer');
const productExists = require('../middleware/productExists');

const router = express.Router();

//GET
router.get('/productos/listar', productControler.getAllProducts);
router.get('/productos/listar/:id', productExists, productControler.getProduct);
//POST
router.post('/productos/guardar/', upload.single('thumbnail'), productControler.createProduct);
//PUT
router.put('/productos/actualizar/:id', productExists, upload.single('thumbnail'), productControler.updateProduct);
//DELETE
router.delete('/productos/borrar/:id', productExists, productControler.deleteProduct);

module.exports = router;
