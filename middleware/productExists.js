const Producto = require('../models/producto');

const productExists = async (req, res, next) => {
	try {
		await Producto.findById(req.params.id);
		next();
	} catch (err) {
		res.status(400).json({ error: 'producto no encontrado' });
	}
};

module.exports = productExists;
