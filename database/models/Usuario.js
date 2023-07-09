module.exports = function(sequelize, dataTypes) {
    let alias = "Usuario"

    let cols = {
        id: {
            type: dataTypes.INTEGER(100),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: dataTypes.VARCHAR(50),
            allowNull: false
        },
        nombre: {
            type: dataTypes.VARCHAR(50),
            allowNull: false
        },
        apellido: {
            type: dataTypes.VARCHAR(50),
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
            type: dataTypes.VARCHAR(50),
            allowNull: false
        },
        img: {
            type: dataTypes.VARCHAR(100),
            allowNull: true
        },
        contraseña: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        rol_id: {
            type: dataTypes.VARCHAR(10),
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
        })
    }

    return  Usuario;
}