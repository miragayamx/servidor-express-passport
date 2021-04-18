const productos = require('../modelo/productos');

const productosVista = (req, res) => {
    const lista = productos.getList();
	if (!lista.length) return res.render("productos-vista", {lista: lista, existe: false});
	res.render("productos-vista", {lista: lista, existe: true})
};

const productosRegistrar = (req, res) => {
	const lista = productos.getList();
	if (!lista.length) return res.render("ingreso-producto", {lista: lista, existe: false});
	res.render("ingreso-producto", {lista: lista, existe: true});
};

module.exports = {
    productosVista,
    productosRegistrar
};