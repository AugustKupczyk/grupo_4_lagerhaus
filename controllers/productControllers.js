const { Producto } = require('../database/models');
const { CategoriaProducto } = require("../database/models");


const controllers = {
    create: async (req, res) => {
        let userData = req.session.user;
        if (!userData) {
            userData = {}
        }

        res.render('products/agregar-producto', { userData });
    },
    saved: async (req, res) => {
        const nuevoProducto = {
            nombre: req.body.name,
            categoria_id: req.body.category,
            descripcion: req.body.description,
            precio: req.body.price,
            img: " ",
        };
        console.log(nuevoProducto);
        nuevoProducto.img = req.file ? req.file.filename : "sin foto"
        try {
            const datos = await Producto.create(nuevoProducto);
            console.log(datos);
        } catch (error) {
            console.log(error);
        }

        res.redirect('/products/menu');
    },

    getDetalleProducto: async (req, res) => {
        try {
            const producto = await Producto.findByPk(req.params.id);

            res.render('detalle-producto', { producto, user: req.session.user })
        } catch (error) {
            console.log(error);
        }
    },

    listForm: async (req, res) => {

        let userData = req.session.user || {};

        try {
            const categorias = await CategoriaProducto.findAll({
                include: [{ model: Producto, as: 'productos' }]
            });

            res.render('menu', { categorias, userData });
        } catch (error) {
            res.render('menu', { categorias: [], userData });
            console.log(error);
        }
    },

    getUpdate: async (req, res) => {
        let userData = req.session.user;
        if (!userData) {
            userData = {}
        }
        try {
            const producto = await Producto.findByPk(req.params.id);

            res.render('editar-producto', { producto, userData })
        } catch (error) {
            console.log(error);
        }
    },
    updateProducto: async (req, res) => {
        let productId = req.params.id;

        try {
            await Producto.update(
                {
                    nombre: req.body.name,
                    categoria_id: req.body.category,
                    descripcion: req.body.description,
                    precio: req.body.price,
                },
                {
                    where: { id: [productId] },
                });

            res.redirect('/products/menu');
        } catch (error) {
            res.send('No se pudo actualizar!')
            console.log(error);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await Producto.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.redirect('/products/menu');
        } catch (error) {
            res.send('No se pudo borrar!')
            console.log(error);
        }

    }
}

module.exports = controllers;