const express = require("express");
const path = require('path');
const authMiddlewares = require("../middlewares/authMiddlewares");
const productValidations = require("../middlewares/productValidations");
const productControllers = require("../controllers/productControllers");
const productImg = require("../middlewares/productImg");
const router = express.Router();

// @GET /products 
router.get("/menu", authMiddlewares.allowSignedIn, productControllers.listForm);

// @POST /products (Aca se recibe la informacion del nuevo producto para despues almacenarla en algun lado)
router.post('/menu', [productImg.single('image'),productValidations.createValidations,productValidations.validateCreate,authMiddlewares.allowAdmin], productControllers.saved);

// @GET /products/agregar-producto (Vista de formulario de creacion de producto)
router.get("/agregar-producto", authMiddlewares.allowAdmin, productControllers.create);

// @GET /products/:id/detail ---> /products/5/detail
router.get("/:id/detalle-producto", authMiddlewares.allowSignedIn, productControllers.getDetalleProducto);

// @DELETE /products/:id/delete ---> /products/5/delete
router.delete('/:id/delete', authMiddlewares.allowAdmin, productControllers.deleteProduct);

// @GET /products/:id/update 
router.get('/:id/editar-producto', authMiddlewares.allowAdmin, productControllers.getUpdate);

// @PUT /products/:id/update ---> /products/5/put
router.put('/:id/editar-producto', authMiddlewares.allowAdmin, productControllers.updateProducto);

router.get("/carrito-compras", authMiddlewares.allowSignedIn, productControllers.getCarritoCompras);

//@POST Agregamos un producto al Carrito de Compras
router.post('/agregar-al-carrito/:id', productControllers.agregarProductoAlCarrito);

//@DELETE Eliminamos un producto del Carrito de Compras
router.delete('/eliminar-producto/:id', productControllers.eliminarProductoDelCarrito);

// // @GET /products/confirmacion-producto
// router.get("/confirmacion-producto", productControllers.getConfirmacionProducto);

module.exports = router;
