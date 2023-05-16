const express = require ("express");
const productControllers = require("../controllers/productControllers.js");
const router = express.Router();

router.get("/menu", productControllers.getMenu);
router.get("/detalle-producto", productControllers.getDetalleProducto);
router.get("/carrito-compras", productControllers.getCarritoCompras);
router.get("/confirmacion-producto", productControllers.getConfirmacionProducto);

module.exports = router;
