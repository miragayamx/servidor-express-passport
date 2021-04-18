const productos = require('../modelo/productosBD');

const productExists = async (req, res, next) => {
	const producto = await productos.getProduct(req.params.id);
	if (!producto) return res.status(400).json({ error: 'producto no encontrado' });
	next();
};

module.exports = productExists;