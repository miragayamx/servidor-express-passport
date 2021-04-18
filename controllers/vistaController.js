const productos = require('../modelo/productosBD');

const productosVista = async (req, res) => {
    const lista = await productos.getProducts();
	if (!lista.length) return res.render("productos-vista", {lista: lista, existe: false});
	res.render("productos-vista", {lista: lista, existe: true})
};

const productosRegistrar = async (req, res) => {
	const lista = await productos.getProducts();
	if (!lista.length) return res.render("ingreso-producto", {lista: lista, existe: false});
	res.render("ingreso-producto", {lista: lista, existe: true});
};

module.exports = {
    productosVista,
    productosRegistrar
};