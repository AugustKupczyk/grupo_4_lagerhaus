module.exports = function (sequelize, dataTypes) {
    let alias = "Usuario"

    let cols = {
        id: {
            type: dataTypes.INTEGER(100),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        numero_celular: {
            type: dataTypes.INTEGER(50),
            allowNull: false
        },
        nacimiento: {
            type: dataTypes.INTEGER(8),
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        img: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        contraseña: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rol_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "categorias_users",
                key: "id"
            }
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    let Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = models => {
        Usuario.belongsTo(models.CategoriaUsuario, {
            as: "rol",
            foreignKey: "rol_id"
        });

        Usuario.hasMany(models.CarritoCompra, {
            as: "carritosDeCompra",
            foreignKey: "usuario_id",
        });
    }

    return Usuario;
}