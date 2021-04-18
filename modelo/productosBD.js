const { options } = require('../options/mariaDB');
const knex = require('knex')(options);

const createTable = async () => {
	try {
		await knex.schema.createTable('productos', function(table) {
			table.increments('id');
			table.string('name');
			table.decimal('price');
			table.string('thumbnail');
		});
		console.log('Base de datos MariaDB lista');
	} catch (err) {
		if (e.errno === 1050) return console.log('Base de datos MariaDB lista');
		console.log(err.message);
	}
};

const getProducts = async () => {
	try {
		productos = knex.from('productos').select('*');
		return productos;
	} catch (err) {
		return console.log(err);
	}
};
const getProduct = async (id) => {
	try {
		productos = knex.from('productos').select('*').where('id', id);
		return productos;
	} catch (err) {
		return console.log(err);
	}
};
const addProduct = async (item) => {
	try {
		productos = knex('productos').insert(item);
		return productos;
	} catch (err) {
		return console.log(err);
	}
};
const updateProduct = async (id, item) => {
	try {
		producto = knex.from('productos').where('id', id).update(item);
		return producto;
	} catch (err) {
		return console.log(err);
	}
};
const deleteProduct = async (id) => {
	try {
		producto = knex.from('productos').where('id', id).del();
		return producto;
	} catch (err) {
		return console.log(err);
	}
};

module.exports = {
	createTable,
	getProducts,
	getProduct,
	addProduct,
	updateProduct,
	deleteProduct
};
