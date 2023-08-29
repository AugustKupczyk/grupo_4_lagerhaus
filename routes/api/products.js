const express = require('express');
const router = express.Router();
const productControllers = require('../../controllers/api/productControllersApi');

// Ruta para obtener la lista completa de productos
router.get('/', productControllers.getAllProducts);

// Ruta para obtener los detalles de un producto en particular por su ID
router.get('/:id', productControllers.getProductById);

// Ruta para obtener la imagen de un producto por su ID
router.get('/:id/image', productControllers.getProductImage);

module.exports = router;