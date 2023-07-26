module.exports = function(sequelize, dataTypes) {
    let alias = "Carrito"

    let cols = {
        id: {
            type: dataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        id_usuario: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    }

    let config = {
        tableName: "carrito_compras",
        timestamps: false
    }

    let Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = models => {
        Carrito.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "id_usuario"
        })
    },
    Carrito.associate = models => {
    Carrito.belongsToMany(models.Producto, {
        through: models.CarritoProducto,
        as: "productos",
        foreignKey: "id_carrito",
        otherKey: "id_producto"
    })
    }   

    return  Carrito;
}