const productos = require('../modelo/productos');

const productExists = (req, res, next) => {
	const producto = productos.getProduct(req.params.id)[0];
	if (!producto) return res.status(400).json({ error: 'producto no encontrado' });
	next();
};

module.exports = productExists;