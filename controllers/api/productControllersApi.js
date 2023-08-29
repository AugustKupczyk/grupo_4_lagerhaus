const { Producto, CategoriaProducto, sequelize } = require('../../database/models');

const productControllers = {
    getAllProducts: async (req, res) => {
        try {
            // Obtener la cantidad total de productos
            const totalProducts = await Producto.count();

            // Obtener el recuento por categoría utilizando una consulta JOIN
            const countByCategory = await CategoriaProducto.findAll({
                attributes: ['nombre', [sequelize.fn('COUNT', sequelize.col('productos.id')), 'count']],
                include: {
                    model: Producto,
                    as: 'productos',
                },
                group: ['nombre'],
            });

            // Obtener la lista de productos
            const products = await Producto.findAll();

            // Formatear la respuesta
            const response = {
                count: totalProducts,
                countByCategory: countByCategory.map(category => {
                    return {
                        nombre: category.nombre,
                        count: category.get('count'),
                    };
                }),
                products: products.map(product => {
                    return {
                        id: product.id,
                        nombre: product.nombre,
                        descripcion: product.descripcion,
                        // Agregar más campos según sea necesario
                        detail: `/api/products/${product.id}`,
                    };
                }),
            };

            res.json(response);
        } catch (error) {
            console.error('Error al obtener la lista de productos:', error);
            res.status(500).json({ error: 'Hubo un error al obtener la lista de productos' });
        }
    },
    getProductById: async (req, res) => {
        const productId = req.params.id;

        try {
            // Obtener los detalles del producto por ID
            const product = await Producto.findByPk(productId);

            if (!product) {
                return res.status(404).json({ error: 'El producto no fue encontrado.' });
            }

            // Formatear la respuesta con los detalles del producto
            const response = {
                id: product.id,
                nombre: product.nombre,
                descripcion: product.descripcion,
                // Agregar más campos según sea necesario
                // ...
                // URL para la imagen del producto
                image: `http://localhost:3030${product.img}`,
            };

            res.json(response);
        } catch (error) {
            console.error('Error al obtener los detalles del producto:', error);
            res.status(500).json({ error: 'Hubo un error al obtener los detalles del producto' });
        }
    },

    // Obtener la imagen de un producto por su ID
    getProductImage: async (req, res) => {
        const productId = req.params.id;

        try {
            const product = await Producto.findByPk(productId);

            if (!product || !product.img) {
                return res.status(404).json({ error: 'Producto no encontrado o sin imagen' });
            }

            // Construir la ruta completa a la imagen en base a la columna "img" de la base de datos
            const imagePath = path.join('public', product.img);

            // Enviar la imagen como respuesta
            res.sendFile(imagePath);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la imagen del producto' });
        }
    }
};

module.exports = productControllers;