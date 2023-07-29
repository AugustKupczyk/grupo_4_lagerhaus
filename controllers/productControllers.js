const { Producto } = require('../database/models');
const { CategoriaProducto } = require("../database/models");
const { CarritoCompra } = require("../database/models");
const { ProductosCarrito } = require("../database/models");
const { Usuario } = require("../database/models")


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
            // Verificar si el usuario ha iniciado sesión
            if (!req.session.user) {
                return res.redirect('/users/login');
            }

            // Obtener el ID del usuario desde la sesión
            const usuarioId = req.session.user.id;

            // Buscar el carrito del usuario en la base de datos
            const carrito = await CarritoCompra.findOne({
                where: { usuario_id: usuarioId },
                include: {
                    model: ProductosCarrito,
                    as: 'productosCarrito',
                    include: 'producto', // Incluir el modelo Producto
                },
            });

            // Si el carrito está vacío o no existe, mostrar el carrito vacío en la vista
            if (!carrito || carrito.productosCarrito.length === 0) {
                return res.render('carrito-vacio'); // Crea una vista EJS para mostrar el carrito vacío
            }

            // Calcular el precio total del carrito multiplicando precios unitarios por cantidad
            const precioTotal = carrito.productosCarrito.reduce((total, item) => {
                return total + item.precio_unitario * item.cantidad;
            }, 0);

            // Renderizar la vista del carrito con los productos del carrito y el precio total
            res.render('carrito-compras', { carrito, precioTotal });
        } catch (error) {
            console.error('Error al obtener el carrito de compras:', error);
            res.redirect('/');
        }
    },
    agregarProductoAlCarrito: async (req, res) => {
        try {
            console.log(1);
            // Obtener el ID del usuario desde la sesión
            const usuarioId = req.session.user.id;

            // Buscar el carrito del usuario en la base de datos
            let carrito = await CarritoCompra.findOne({ where: { usuario_id: usuarioId } });
            console.log(2);
            // Si no existe un carrito para el usuario, crear uno nuevo
            if (!carrito) {
                carrito = await CarritoCompra.create({
                    usuario_id: usuarioId,
                    fecha_compra: new Date(),
                    cantidad_items: 0,
                    precio_total: 0
                });
            }
            console.log(3);

            // Obtener el ID del producto que se va a agregar al carrito
            const productoId = req.body.productoId;

            console.log('Usuario ID:', usuarioId);
            console.log('Producto ID a agregar:', productoId);


            // Buscar el producto en la base de datos
            const producto = await Producto.findByPk(productoId);

            // Verificar si el producto existe
            if (!producto) {
                return res.status(404).json({ error: 'El producto no fue encontrado.' });
            }

            // Verificar si el producto ya está en el carrito
            const productoEnCarrito = await ProductosCarrito.findOne({
                where: { carrito_id: carrito.id, producto_id: productoId }
            });

            if (productoEnCarrito) {
                // Si el producto ya está en el carrito, aumentar la cantidad en 1
                productoEnCarrito.cantidad += 1;
                await productoEnCarrito.save();
            } else {
                // Si el producto no está en el carrito, crear un nuevo registro en la tabla ProductosCarrito
                await ProductosCarrito.create({
                    carrito_id: carrito.id,
                    producto_id: productoId,
                    cantidad: 1,
                    precio_unitario: producto.precio
                });
            }

            res.redirect("/products/menu");
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            res.status(500).json({ error: 'Hubo un error al agregar el producto al carrito' });
        }
    },

    eliminarProductoDelCarrito: async (req, res) => {
        try {
            // Obtener el ID del usuario desde la sesión
            const usuarioId = req.session.user.id;
    
            // Obtener el ID del producto que se va a eliminar del carrito
            const productoId = req.params.id;

            // Buscar el carrito del usuario en la base de datos
            const carrito = await CarritoCompra.findOne({ where: { usuario_id: usuarioId } });
    
            // Verificar si el carrito existe
            if (!carrito) {
                return res.status(404).json({ error: 'El carrito no fue encontrado.' });
            }
    
            // Buscar el producto en el carrito
            const productoEnCarrito = await ProductosCarrito.findOne({
                where: { carrito_id: carrito.id, producto_id: productoId }
            });
    
            // Verificar si el producto está en el carrito
            if (!productoEnCarrito) {
                return res.status(404).json({ error: 'El producto no está en el carrito.' });
            }
    
            // Si el producto está en el carrito y su cantidad es mayor a 1, reducir la cantidad en 1
            if (productoEnCarrito.cantidad > 1) {
                productoEnCarrito.cantidad -= 1;
                await productoEnCarrito.save();
            } else {
                // Si la cantidad es igual a 1, eliminar el registro del producto en el carrito
                await productoEnCarrito.destroy();
            }
    
            res.redirect('/carrito-compras');
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            res.status(500).json({ error: 'Hubo un error al eliminar el producto del carrito' });
        }
    }

}


module.exports = controllers;