const productos = require("../modelo/productosBD");
const { deleteFile } = require("../utils/fileManager");

//GET
const getAllProducts = async (req, res) => {
  try {
    const lista = await productos.getProducts();
    res.status(200).json(lista);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
const getProduct = async (req, res) => {
  try {
    const producto = await productos.getProduct(req.params.id)[0];
    res.status(200).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//POST
const createProduct = async (req, res) => {
  try {
    const newProducto = await productos.addProduct({
      title: req.body.title,
      price: req.body.price,
      thumbnail: "/uploads/" + req.file.filename,
    });
    res.status(201).json(newProducto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//PUT
const updateProduct = async (req, res) => {
  try {
    if (!!req.file) req.body.thumbnail = "/uploads/" + req.file.filename;
    const updatedProduct = await productos.updateProduct(req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//DELETE
const deleteProduct = async (req, res) => {
  try {
    const producto = await productos.getProduct(req.params.id)[0];
    if (producto.thumbnail.includes("uploads"))
      await deleteFile(`./public/${producto.thumbnail}`);
    await productos.deleteProduct(req.params.id);
    res.status(200).json(producto);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
