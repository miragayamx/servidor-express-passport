const { requiredData, validFields } = require('./validData');

class Productos {
	constructor(prod = []) {
		this.productos = [];
		this.productoKeys = [ 'title', 'price', 'thumbnail' ];
	}
	setList(productList) {
		this.productos = productList;
	}
	getList() {
		return this.productos;
	}
	getProduct(id) {
		const producto = this.productos.filter((el) => el.id === Number(id))[0];
		if (!producto) throw new Error('producto no encontrado');
		return producto;
	}
	addProduct(item) {
		const validItem = requiredData(item, this.productoKeys);
		if (!validItem) throw new Error('Los datos del producto proporcionado no son suficientes');
		let newId = 1;
		if (!!this.productos.length) newId = this.productos[this.productos.length - 1].id + 1;
		const itemWithId = {
			...item,
			price: Number(item.price),
			id: newId
		};
		this.productos.push(itemWithId);
		return itemWithId;
	}
	updateProduct(id, item) {
		const index = this.productos.findIndex((el) => el.id === Number(id));
		if (index < 0) throw new Error('producto no encontrado');
		const productToUpdate = validFields(item, this.productoKeys);
		this.productos[index] = {
			...this.productos[index],
			...productToUpdate
		};
		return this.productos[index];
	}
	deleteProduct(id) {
		const index = this.productos.findIndex((el) => el.id === Number(id));
		if (index < 0) throw new Error('producto no encontrado');
		const deleteProduct = this.productos[index];
		this.productos.splice(index, 1);
		return deleteProduct;
	}
}

const muestra = [
	{
		title: 'Escuadra',
		price: 123.45,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
		id: 1
	},
	{
		title: 'Calculadora',
		price: 234.56,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
		id: 2
	},
	{
		title: 'Globo Terráqueo',
		price: 345.67,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
		id: 3
	}
];

const productos = new Productos();
productos.setList(muestra);

module.exports = productos;
