const path = require ("path");

const controllers={
    getCarritoCompras:(req,res) =>{
        res.render("carrito-compras");
    },
    getConfirmacionProducto:(req,res) =>{
        res.render("confirmacion-producto");
    },
    getDetalleProducto:(req,res) =>{
        res.render("detalle-producto");
    },
    getMenu:(req,res) =>{
        res.render("menu");
    },

}

module.exports = controllers;