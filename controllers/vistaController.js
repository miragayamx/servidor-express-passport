const productos = require("../modelo/productosBD");

const productosVista = async (req, res) => {
  try {
    const lista = await productos.getProducts();
    res.render("productos-vista", { lista: lista, existe: true });
  } catch (err) {
    res.render("productos-vista", { lista: [], existe: false });
  }
};

const productosRegistrar = async (req, res) => {
  try {
    const lista = await productos.getProducts();
    res.render("ingreso-producto", { lista: lista, existe: true });
  } catch (err) {
    res.render("ingreso-producto", { lista: [], existe: false });
  }
};

module.exports = {
  productosVista,
  productosRegistrar,
};
