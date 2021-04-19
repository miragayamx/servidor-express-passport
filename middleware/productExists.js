const productos = require("../modelo/productosBD");

const productExists = async (req, res, next) => {
  try {
    await productos.getProduct(req.params.id);
    next();
  } catch (err) {
    res.status(400).json({ error: "producto no encontrado" });
  }
};

module.exports = productExists;
