const path = require("path");
 
const productModel = require('../models/products');

const controllers = {

    //@GET /menu
    getMenu: (req, res) => {
        const products = productModel.findAll();
        const tapeo = products.filter(product => product.category === "Tapeo");
        const burgers = products.filter(product => product.category === "Burgers");
        const sandwiches = products.filter(product => product.category === "Sandwiches");
        const wraps = products.filter(product => product.category === "Wraps");
        const sinTACC = products.filter(product => product.category === "Sin TACC");
        const vegano = products.filter(product => product.category === "Vegano");
        const cervezas = products.filter(product => product.category === "Cerveza");
        const tragos = products.filter(product => product.category === "Tragos y gaseosas");
        res.render("menu", { burgers, tapeo, sandwiches, wraps, vegano, cervezas, tragos, sinTACC });
    },

    //@GET /menu/agregar-producto
    getAgregar: (req, res) => {
        res.render('agregar-producto');
    },
    
    // @POST /menu/agregar-producto
    postProduct: (req, res) => {
        let datos = req.body;

        console.log(req.files)

        datos.price = Number(datos.price);
        /* datos.img = '/imgs/products/' + req.file.filename; */
        datos.imgs = req.files.map(file => '/imgs/products' + file.filename);

        productModel.createOne(datos);

        res.redirect('/menu');
    },

    // @GET /menu/:id/detail
    getDetalleProducto: (req, res) => {
        // Agarramos el ID que nos pasaron por parámetro de ruta, y lo convertimos en number
        const id = Number(req.params.id);

        // Buscamos en el array de productos, el producto cuyo ID coincida con el que nos enviaron por params
        const productoAMostrar = productModel.findById(id);

        // Si el producto no se encuentra (su id es inválido)
        if (!productoAMostrar) {
            // Con el return detenemos la ejecución del controller, y con el res.send enviamos un mensaje de error
            // *queremos detener la ejecución para que no se ejecute el otro res.render (la otra respuesta)
            return res.send('error de id');
        }

        // Renderizamos la vista productDetail, y le pasamos los datos del producto solicitado
        res.render("detalle-producto", { product: productoAMostrar });
    },

    // @GET / editar
    getEditar: (req, res) => {
        const id = Number(req.params.id);
        const productoAModificar = productModel.findById(id)
        
        if (!productoAModificar) {
            // Con el return detenemos la ejecución del controller, y con el res.send enviamos un mensaje de error
            // *queremos detener la ejecución para que no se ejecute el otro res.render (la otra respuesta)
            return res.send('error de id');
        }
        
        res.render('editar-producto', { product: productoAModificar });
    },
    
    // @GET / editar
    updateProduct: (req, res) => {
        const id = Number(req.params.id);
        const nuevosDatos = req.body;

        productModel.updateById(id, nuevosDatos);

        res.redirect('/menu');
    },

    // @DELETE /products/:id/delete
    deleteProduct: (req, res) => {
        const id = Number(req.params.id);

        productModel.deleteById(id);

        res.redirect('/menu');

    },

    getCarritoCompras: (req, res) => {
        res.render("carrito-compras");
    },

    getConfirmacionProducto: (req, res) => {
        res.render("confirmacion-producto");
    },

}

module.exports = controllers;