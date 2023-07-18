const { Producto } = require('../database/models');
const { CategoriaProducto } = require("../database/models");


const controllers = {
    create: async (req, res) => {
        let userData = req.session.user;
        if (!userData) {
            userData = {}
        }

        try {
            const productos = await Producto.findAll({
                raw: true
            });

            res.render('agregar-producto', { productos, userData });
        } catch (error) {
            res.render('agregar-producto', { productos: [], userData });
            console.log(error);
        }
    },
    saved: async (req, res) => {
        let userData = req.session.user;
        if (!userData) {
            userData = {}
        }
        const nuevoProducto = {
            nombre: req.body.name,
            categoria_id: req.body.categoria,
            descripcion: req.body.description,
            precio: req.body.price,
            img: " ",
        };

        nuevoProducto.img = req.files.map(file => '/imgs/products/' + file.filename);
        try {
            const datos = await Producto.create(nuevoProducto);
            console.log(datos);
        } catch (error) {
            console.log(error);
        }

        res.send('Producto creado con exito', { userData });
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

    updateProducto: async (req, res) => {
        let userData = req.session.user;
        if (!userData) {
            userData = {}
        }

        const newValues = req.body;

        try {
            await Producto.update(newValues, {
                where: {
                    id: req.body.id
                }
            });

            res.redirect('/productsList', { userData });
        } catch (error) {
            res.send('No se pudo actualizar!', { userData })
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
    deleteProduct: async (req, res) => {
        try {
            await Producto.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.redirect('/productsList');
        } catch (error) {
            res.send('No se pudo borrar!')
            console.log(error);
        }

    }
}

module.exports = controllers;