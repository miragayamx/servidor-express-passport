const faker = require('faker');
const Producto = require('../models/producto');

faker.locale = 'es';

const productosVista = async (req, res) => {
	try {
		const lista = await Producto.find().lean();
		if (!lista.length) throw Error();
		res.render('productos-vista', { lista: lista, existe: true });
	} catch (err) {
		res.render('productos-vista', { lista: [], existe: false });
	}
};

const productosRegistrar = async (req, res) => {
	try {
		const lista = await Producto.find().lean();
		if (!lista.length) throw Error();
		res.render('ingreso-producto', { lista: lista, existe: true });
	} catch (err) {
		res.render('ingreso-producto', { lista: [], existe: false });
	}
};

const productosVistaTest = (req, res) => {
	try {
		const cantidad = Number(req.query.cant) || 10;
		const lista = [];
		for (let i = 0; i < cantidad; i++) {
			const fakeProduct = {
				title: faker.commerce.productName,
				price: faker.commerce.price,
				thumbnail: faker.image.image
			};
			lista.push(fakeProduct);
		}
		if (!lista.length) throw Error();
		res.render('productos-vista', { lista: lista, existe: true });
	} catch (err) {
		res.render('productos-vista', { lista: [], existe: false });
	}
};

module.exports = {
	productosVista,
	productosRegistrar,
	productosVistaTest
};
