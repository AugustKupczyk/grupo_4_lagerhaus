const express = require("express");
const path = require('path');
const multer = require('multer');

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
router.get("/menu", productControllers.getMenu);

// @POST /products (Aca se recibe la informacion del nuevo producto para despues almacenarla en algun lado)
router.post('/menu', upload.any('img'), productControllers.postProduct);

// @GET /products/agregar-producto (Vista de formulario de creacion de producto)
router.get("/agregar-producto", productControllers.getAgregar);

// @GET /products/:id/detail ---> /products/5/detail
router.get("/:id/detalle-producto", productControllers.getDetalleProducto);

// @DELETE /products/:id/delete ---> /products/5/delete
router.delete('/:id/delete', productControllers.deleteProduct);

// @GET /products/:id/update 
router.get('/:id/editar-producto', productControllers.getEditar);

// @PUT /products/:id/update ---> /products/5/put
router.put('/:id/editar-producto', productControllers.updateProduct);

// @GET /products/cart
router.get("/carrito-compras", productControllers.getCarritoCompras);

// @GET /products/confirmacion-producto
router.get("/confirmacion-producto", productControllers.getConfirmacionProducto);

module.exports = router;
