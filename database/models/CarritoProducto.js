module.exports = function(sequelize, dataTypes) {
    let alias = "CarritoProducto"

    let cols = {
        id: {
            type: dataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        id_producto: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        id_carrito: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    }

    let config = {
        tableName: "carrito_producto",
        timestamps: false
    }

    let CarritoProducto = sequelize.define(alias, cols, config);

    CarritoProducto.associate = models => {
        CarritoProducto.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "id_producto"
        });
    }

    return CarritoProducto;
}