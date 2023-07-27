const { Producto } = require('../database/models');
const { CategoriaProducto } = require("../database/models");
const { Carrito } = require("../database/models");
const { CarritoProducto } = require("../database/models");


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

    },

    getCarritoCompras: async (req, res) => {
        try {
            const { id } = req.params;
            
            console.log("ID del usuario en sesión:", req.session.user.id);
            console.log("ID del usuario en la URL:", id);

          // Verificar si el correo electrónico de la URL coincide con el usuario que ha iniciado sesión
          if (req.session.user.id !== Number(id)) {
            return res.status(401).send("Acceso no autorizado");
          }
    
          // Buscar el usuario actual por su correo ID
          const usuarioActual = await Usuario.findOne({ where: { id } });
    
          if (!usuarioActual) {
            return res.status(404).send("Usuario no encontrado");
          }
    
          // Buscar el carrito de compras del usuario actual por su ID de usuario
          const carrito = await Carrito.findOne({
            where: { id: usuarioActual.id },
            include: {
              model: Producto,
              as: 'productos',
              through: {
                model: CarritoProducto,
                attributes: [] // No mostrar los atributos de la tabla intermedia
              }
            }
          });
    
          if (!carrito) {
            return res.status(404).json({ error: 'El carrito de compras no fue encontrado.' });
          }
    
          // Retornar el carrito y sus productos asociados
          res.json(carrito);
    
        } catch (error) {
          console.error('Error al obtener el carrito de compras:', error);
          res.status(500).json({ error: 'Hubo un error al obtener el carrito de compras.' });
        }
      }
}

module.exports = controllers;