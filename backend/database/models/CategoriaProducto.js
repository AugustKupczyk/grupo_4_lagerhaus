module.exports = function(sequelize, dataTypes) {
    let alias = "CategoriaProducto"

    let cols = {
        id: {
            type: dataTypes.INTEGER(4),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    }

    let config = {
        tableName: "categorias_products",
        timestamps: false
    }

    let CategoriaProducto = sequelize.define(alias, cols, config);

    CategoriaProducto.associate = models => {
        CategoriaProducto.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "categoria_id"
        })
    }

    return  CategoriaProducto;
}