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
            res.render("register", { error,errors:[] });
        } catch (error) {
            console.error(error);
            res.redirect("/");
        }
    },

    registerUser: async (req, res) => {
        try {
            console.log(req.body)
            const { nombre, apellido, email, password,nacimiento, direccion } = req.body;
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Definimos el rol_id para usuarios normales (suponiendo que 2 es el id de usuarios normales)
            const rol_id = 2;

            const createdUser = await Usuario.create({
                nombre,
                apellido,
                email,
                contraseña: hashedPassword,
                nacimiento,
                direccion,
                img: req.file ? `/imgs/users/${req.file.filename}` : "user_placeholder.png",
                rol_id,
                // Agregar otros campos según sea necesario
            });

            console.log('User Created:', createdUser); // Agrega este console log

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
            res.render("login", { error,errors:[] });
        } catch (error) {
            console.error(error);
            res.redirect("/");
        }
    },

    loginUser: async (req, res) => {
        try {
            const searchedUser = await Usuario.findOne({ where: { email: req.body.email } });

            const isCorrect = await bcrypt.compare(req.body.password, searchedUser.contraseña);

            if (isCorrect) {
                if (!!req.body.remember) {
                    res.cookie('email', searchedUser.email, {
                        maxAge: 1000 * 60 * 60 * 24 * 360 * 9999
                    });
                }

                // Eliminar la contraseña y el id del objeto del usuario buscado
                const userWithoutPassword = { ...searchedUser.get(), contraseña: undefined};

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
    },
    getEditProfile: async (req, res) => {
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
            res.render('editProfile', { perfil: perfilAMostrar, user: req.session.user, userData });
        } catch (error) {
            console.error(error);
            res.redirect("/");
        }
    },
    editProfile: async (req, res) => {
        try {
            const email = req.params.email;

            // Verificar si el correo electrónico de la URL coincide con el usuario que ha iniciado sesión
            if (req.session.user.email !== email) {
                return res.send("Acceso no autorizado");
            }

            // Obtener los datos actualizados del formulario
            const { nombre, apellido, direccion} = req.body;

            // Actualizar los campos del perfil en la base de datos
            await Usuario.update(
                { nombre, apellido, direccion},
                { where: { email } }
            );

            // Procesar la imagen si se ha seleccionado una nueva
            if (req.file) {
                // Aquí puedes guardar el nombre del archivo de imagen en la base de datos
                // Suponiendo que la tabla tiene un campo "imagen" para almacenar el nombre del archivo
                await Usuario.update(
                    { img: req.file.filename }, // Guardar el nombre del archivo en la base de datos
                    { where: { email } }
                );
            }

            // Redirigir a la página de perfil actualizado
            res.redirect(`/users/profile/${email}`);
        } catch (error) {
            console.error(error);
            res.redirect("/");
        }
    }
};

module.exports = controllers;



