module.exports = function (sequelize, dataTypes) {
    let alias = "ProductosCarrito"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        carrito_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "carrito_de_compras",
                key: "id"
            }
        },
        producto_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id"
            }
        },
        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        precio_unitario: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    }

    let config = {
        tableName: "productos_carrito",
        timestamps: false
    }

    let ProductosCarrito = sequelize.define(alias, cols, config);

    ProductosCarrito.associate = models => {
        ProductosCarrito.belongsTo(models.CarritoCompra, {
            as: "carrito",
            foreignKey: "carrito_id"
        });
        ProductosCarrito.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "producto_id"
        });
    }

    return ProductosCarrito;
}

