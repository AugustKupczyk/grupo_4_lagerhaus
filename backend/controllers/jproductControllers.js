const path = require("path"); 
const expressValidator = require('express-validator');

const productModel = require('../models/products');

const controllers = {

    //@GET /menu
    getMenu: (req, res) => {
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }
        const products = productModel.findAll();
        const tapeo = products.filter(product => product.category === "Tapeo");
        const burgers = products.filter(product => product.category === "Burgers");
        const sandwiches = products.filter(product => product.category === "Sandwiches");
        const wraps = products.filter(product => product.category === "Wraps");
        const sinTACC = products.filter(product => product.category === "Sin TACC");
        const vegano = products.filter(product => product.category === "Vegano");
        const cervezas = products.filter(product => product.category === "Cerveza");
        const tragos = products.filter(product => product.category === "Tragos y gaseosas");
        res.render("menu", { tapeo, burgers, sandwiches, wraps, vegano, cervezas, tragos, sinTACC, userData });
    },

    //@GET /menu/agregar-producto - Solo manda la vista del forulario de creacion :)
    getAgregar: (req, res) => {
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }
        res.render('agregar-producto', {userData, errors: [], values: {} });
    },
    
    // @POST /menu/agregar-producto
    postProduct: (req, res) => {
        const validation = expressValidator.validationResult(req.body);

        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        if(validation.errors.length > 0){
            return res.render('agregar-producto', {userData, errors: validation.errors, values: req.body });
        }

        let datos = req.body; //Agarro datos que el usuario ingresó en el formulario

        datos.price = Number(datos.price); //Paso el precio a Numero

        /* datos.img = '/imgs/products/' + req.file.filename; */
        datos.imgs = req.files.map(file => '/imgs/products/' + file.filename);

        productModel.createOne(datos);

        res.redirect('/products/menu',);
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
        res.render("detalle-producto", { product: productoAMostrar, user:req.session.user});
    },

    // @GET / editar
    getEditar: (req, res) => {
        
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        const id = Number(req.params.id);
        const productoAModificar = productModel.findById(id)
        
        if (!productoAModificar) {
            // Con el return detenemos la ejecución del controller, y con el res.send enviamos un mensaje de error
            // *queremos detener la ejecución para que no se ejecute el otro res.render (la otra respuesta)
            return res.send('error de id');
        }
        
        res.render('editar-producto', { product: productoAModificar,userData });
    },
    
    // @GET / editar
    updateProduct: (req, res) => {
        const id = Number(req.params.id);
        const nuevosDatos = req.body;
        console.log(nuevosDatos);

        productModel.updateById(id, nuevosDatos);

        res.redirect('/products/menu');
    },

    // @DELETE /products/:id/delete
    deleteProduct: (req, res) => {
        const id = Number(req.params.id);

        productModel.deleteById(id);

        res.redirect('/products/menu');

    },

    getCarritoCompras: (req, res) => {

        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        res.render("carrito-compras", {userData} );
    },

    getConfirmacionProducto: (req, res) => {
        res.render("confirmacion-producto");
    },

}

module.exports = controllers;