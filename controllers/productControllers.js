const path = require("path");
const productModel = require('../models/products');

 
const controllers={

    getMenu:(req,res) =>{
        const products = productModel.findAll();
        const tapeo = products.filter(product => product.category === "tapeo");
        const burgers = products.filter(product => product.category === "burgers");
        const sandwiches = products.filter(product => product.category === "sandwiches");
        const wraps = products.filter(product => product.category === "wraps");
        const sinTACC = products.filter(product => product.category === "sinTACC");
        const vegano = products.filter(product => product.category === "vegano");
        const cervezas = products.filter(product => product.category === "cervezas");
        const tragos = products.filter(product => product.category === "tragos");
        res.render("menu", {burgers, tapeo, sandwiches, wraps, vegano, cervezas, tragos,sinTACC});
    },

    getDetalleProducto:(req,res) =>{
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
        res.render('productDetail', {product: productoAMostrar});
    },

    getAgregar:(req,res) =>{

    },

    getEditar:(req,res) =>{

    },

    deleteProduct:(req,res) =>{

    },

    getCarritoCompras:(req,res) =>{
        res.render("carrito-compras"); 
    },

    getConfirmacionProducto:(req,res) =>{
        res.render("confirmacion-producto");
    },

}

module.exports = controllers;