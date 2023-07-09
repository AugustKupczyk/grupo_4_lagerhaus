module.exports = function(sequelize, dataTypes) {
    let alias = "Producto"

    let cols = {
        id: {
            type: dataTypes.INTEGER(4),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.VARCHAR(50),
            allowNull: false
        },
        categoria_id: {
            type: dataTypes.INTEGER(4),
            allowNull: false,
            references: {
                model: "categorias_products",
                key: "id"
            }
        },
        precio: {
            type: dataTypes.INTEGER(5),
            allowNull: false 
        },
        img: {
            type: dataTypes.VARCHAR(100),
            allowNull: true
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = models => {
        Producto.belongsTo(models.CategoriaProducto, {
            as: "categoria",
            foreignKey: "categoria_id"
        })
    }

    return  Producto;
}