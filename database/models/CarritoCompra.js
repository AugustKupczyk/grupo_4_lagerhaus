module.exports = function (sequelize, dataTypes) {
    let alias = "CarritoCompra"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        usuario_id: {
            type: dataTypes.INTEGER, // Esto es importante, debe ser del mismo tipo que el campo "id" de la tabla de usuarios
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        fecha_compra: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        cantidad_items: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        precio_total: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    }

    let config = {
        tableName: "carrito_de_compras",
        timestamps: false
    }

    let CarritoCompra = sequelize.define(alias, cols, config);

    CarritoCompra.associate = models => {
        CarritoCompra.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "usuario_id"
        });

        CarritoCompra.hasMany(models.ProductosCarrito, {
            as: "productosCarrito",
            foreignKey: "carrito_id"
        });
    }

    return CarritoCompra;
}

