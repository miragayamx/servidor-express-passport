const { options } = require('../options/mariaDB');
const knex = require('knex')(options);
const { requiredData, validFields } = require('./validData');

const productoKeys = [ 'title', 'price', 'thumbnail' ];

const createTable = async () => {
	try {
		await knex.schema.createTable('productos', function(table) {
			table.increments('id');
			table.string('title');
			table.decimal('price');
			table.string('thumbnail');
		});
		console.log('Base de datos MariaDB lista');
	} catch (err) {
		if (err.errno === 1050) return console.log('Base de datos MariaDB lista');
		console.log(err.message);
	}
};
const getProducts = async () => {
	try {
		const productos = await knex.from('productos').select('*');
		if(!!productos.lenght) throw new Error('no hay productos cargados');
		return productos;
	} catch (err) {
		throw err;
	}
};
const getProduct = async (id) => {
	try {
		const producto = knex.from('productos').select('*').where('id', id);
		if (!producto[0]) throw new Error('producto no encontrado');
		return producto[0];
	} catch (err) {
		throw err;
	}
};
const addProduct = async (item) => {
	try {
		const validItem = requiredData(item, productoKeys);
		if (!validItem) throw new Error('Los datos del producto proporcionado no son suficientes');
		const productID = await knex('productos').insert(item);
		const product = await knex.from('productos').select('*').where('id', productID);
		return product;
	} catch (err) {
		throw err;
	}
};
const updateProduct = async (id, item) => {
	try {
		const productToUpdate = validFields(item, productoKeys);
		const update = await knex.from('productos').where('id', id).update(productToUpdate)
		if(update === 0) throw new Error('producto no encontrado');
		const product = await knex.from('productos').select('*').where('id', id);
		return product;
	} catch (err) {
		throw err;
	}
};
const deleteProduct = async (id) => {
	try {
		const deleted = await knex.from('productos').where('id', id).del();
		if(deleted === 0) throw new Error('producto no encontrado');
		return deleted;
	} catch (err) {
		throw err;
	}
};
const deleteAllProducts = async () => {
	await knex('productos').del();
}

module.exports = {
	createTable,
	getProducts,
	getProduct,
	addProduct,
	updateProduct,
	deleteProduct,
	deleteAllProducts
};
