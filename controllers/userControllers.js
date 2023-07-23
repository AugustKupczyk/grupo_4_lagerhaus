const bcrypt = require("bcrypt");
const { Usuario, CategoriaUsuario } = require("../database/models");

const controllers = {
    signOut: async (req, res) => {
        try {
            res.clearCookie("email");
            delete req.session.user;
            res.redirect("/users/login");
        } catch (error) {
            console.error(error);
            res.redirect("/");
        }
    },

    getRegister: async (req, res) => {
        try {
            const error = req.query.error || "";
            let userData = req.session.user || {};
            res.render("register", { error, userData });
        } catch (error) {
            console.error(error);
            res.redirect("/");
        }
    },

    registerUser: async (req, res) => {
        try {
            console.log(req.body)
            const { nombre, apellido, email, password, numero_celular, nacimiento, direccion } = req.body;
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Definimos el rol_id para usuarios normales (suponiendo que 2 es el id de usuarios normales)
            const rol_id = 2;

            const createdUser = await Usuario.create({
                nombre,
                apellido,
                email,
                contraseña: hashedPassword,
                numero_celular,
                nacimiento,
                direccion,
                img: req.file ? req.file.filename : "sin_foto.jpg",
                rol_id,
                // Agregar otros campos según sea necesario
            });

            const userWithoutPassword = { ...createdUser.get(), contraseña: undefined, id: undefined };

            req.session.user = userWithoutPassword;

            res.redirect("/");
        } catch (error) {
            console.error(error);
            res.redirect("/");
        }
    },

    getLogin: async (req, res) => {
        try {
            const error = req.query.error || "";
            let userData = req.session.user || {};
            res.render("login", { error, userData });
        } catch (error) {
            console.error(error);
            res.redirect("/");
        }
    },

    loginUser: async (req, res) => {
        try {
            console.log(req.body);
            const searchedUser = await Usuario.findOne({ where: { email: req.body.email } });

            if (!searchedUser) {
                return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
            }

            console.log(req.body.password);
            console.log(searchedUser.contraseña);

            const isCorrect = await bcrypt.compare(req.body.password, searchedUser.contraseña);

            if (isCorrect) {
                if (!!req.body.remember) {
                    res.cookie('email', searchedUser.email, {
                        maxAge: 1000 * 60 * 60 * 24 * 360 * 9999
                    });
                }

                // Eliminar la contraseña y el id del objeto del usuario buscado
                const userWithoutPassword = { ...searchedUser.get(), contraseña: undefined, id: undefined };

                // Asignar el usuario a la sesión
                req.session.user = userWithoutPassword;

                res.redirect('/');
            } else {
                return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
            }
        } catch (error) {
            console.error(error);
            res.redirect('/');
        }

    },

    getProfile: async (req, res) => {
        try {
            const email = req.params.email;

            // Verificar si el correo electrónico de la URL coincide con el usuario que ha iniciado sesión
            if (req.session.user.email !== email) {
                return res.send("Acceso no autorizado");
            }

            const perfilAMostrar = await Usuario.findOne({ where: { email } });

            if (!perfilAMostrar) {
                return res.send("Usuario no encontrado");
            }

            let userData = req.session.user || {};
            res.render('profile', { perfil: perfilAMostrar, user: req.session.user, userData });
        } catch (error) {
            console.error(error);
            res.redirect("/");
        }
    }
};

module.exports = controllers;



