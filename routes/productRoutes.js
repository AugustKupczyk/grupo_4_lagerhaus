const express = require("express");
const path = require('path');
const multer = require('multer');
const validationMiddlewares = require('../middlewares/validations');
const authMiddlewares = require ("../middlewares/authMiddlewares");

const productControllers = require("../controllers/productControllers");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/imgs/products');
    },
    filename: (req, file, cb) => {
        console.log(path.extname(file.originalname))
        cb(null, Date.now() + '-' + file.originalname);
    } 
});
 
const upload = multer({ storage }); 

// @GET /products 
router.get("/menu", authMiddlewares.allowSignedIn, productControllers.listForm);

// @POST /products (Aca se recibe la informacion del nuevo producto para despues almacenarla en algun lado)
router.post('/menu', [authMiddlewares.allowAdmin,upload.any('img')], productControllers.saved);

// @GET /products/agregar-producto (Vista de formulario de creacion de producto)
router.get("/agregar-producto", authMiddlewares.allowAdmin, productControllers.create);

// @GET /products/:id/detail ---> /products/5/detail
router.get("/:id/detalle-producto",authMiddlewares.allowSignedIn, productControllers.getDetalleProducto);

// @DELETE /products/:id/delete ---> /products/5/delete
router.delete('/:id/delete', authMiddlewares.allowAdmin, productControllers.deleteProduct);

// @GET /products/:id/update 
router.get('/:id/editar-producto',authMiddlewares.allowAdmin, productControllers.getUpdate);

// @PUT /products/:id/update ---> /products/5/put
router.put('/:id/editar-producto',authMiddlewares.allowAdmin, productControllers.updateProducto);

// @GET /products/cart
router.get("/:id/carrito-compras",authMiddlewares.allowSignedIn, productControllers.getCarritoCompras);

// // @GET /products/confirmacion-producto
// router.get("/confirmacion-producto", productControllers.getConfirmacionProducto);

module.exports = router;
