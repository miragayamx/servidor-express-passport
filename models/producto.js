const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		required: true
	},
	thumbnail: {
		type: String,
        required: true,
		trim: true
	}
});

const Producto = mongoose.model('producto', productoSchema);

module.exports = Producto;