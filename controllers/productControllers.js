const { Producto } = require('../database/models');
const {CategoriaProducto } = require("../database/models");

const controllers = {
    create: async (req, res) => {
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        try {
            const productos = await Producto.findAll({
                raw: true
            });

            res.render('agregar-producto', { productos,userData });
        } catch (error) {
            res.render('agregar-producto', { productos: [],userData });
            console.log(error);
        }
    },
    saved: async (req, res) => {
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }
        const nuevoProducto = {
            nombre: req.body.nombre,
            categoria_id: req.body.categoria_id,
            precio: req.body.precio,
            img: req.body.img
        };

        try {
            const datos = await Producto.create(nuevoProducto);
            console.log(datos);
        } catch (error) {
            console.log(error);
        }

        res.send('Producto creado con exito',{userData});
    },

    listForm: async (req, res) => {
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        try {
            const productos = await Producto.findAll({
                include:[{association:"categoria"}],
                raw: true
            });
            

            res.render('menu', { productos,userData });
        } catch (error) {
            res.render('menu', { productos: [],userData });
            console.log(error);
        }
    },

    updateProducto: async (req, res) => {
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        const newValues = req.body;

        try {
            await Producto.update(newValues, {
                where: {
                    id: req.body.id
                }
            });

            res.redirect('/productsList',{userData});
        } catch (error) {
            res.send('No se pudo actualizar!',{userData})
            console.log(error);
        }
    },

    getUpdate: async (req, res) => {
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }
        try {
            const producto = await Producto.findByPk(req.params.id);

            res.render('editar-producto', { producto,userData })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = controllers;