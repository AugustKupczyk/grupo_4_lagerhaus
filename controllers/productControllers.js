const path = require ("path");

const controllers={
    getCarritoCompras:(req,res) =>{
        res.sendFile(path.join(__dirname,"../views/products/carrito-compras.html"));
    },
    getConfirmacionProducto:(req,res) =>{
        res.sendFile(path.join(__dirname,"../views/products/confirmacion-producto.html"));
    },
    getDetalleProducto:(req,res) =>{
        res.sendFile(path.join(__dirname,"../views/products/detalle-producto.html"));
    },
    getMenu:(req,res) =>{
        res.sendFile(path.join(__dirname,"../views/products/menu.html"));
    },

}

module.exports = controllers;