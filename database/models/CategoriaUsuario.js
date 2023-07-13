module.exports = function(sequelize, dataTypes) {
    let alias = "CategoriaUsuario"

    let cols = {
        id: {
            type: dataTypes.INTEGER(4),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        rol: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    }

    let config = {
        tableName: "categorias_users",
        timestamps: false
    }

    let CategoriaUsuario = sequelize.define(alias, cols, config);

    CategoriaUsuario.associate = models => {
        CategoriaUsuario.hasMany(models.Usuario, {
            as: "rol_category",
            foreignKey: "rol_id"
        })
    }


    return  CategoriaUsuario;
}