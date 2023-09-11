const { body, validationResult } = require('express-validator');
const { Usuario } = require('../database/models'); // Asegúrate de importar el modelo de usuario
const bcrypt = require("bcrypt");

const userValidations = {
    registerValidations: [
        body('nombre')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

        body('apellido')
            .notEmpty().withMessage('El apellido es obligatorio')
            .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

        body('email')
            .notEmpty().withMessage('El email es obligatorio')
            .isEmail().withMessage('Ingresa un formato de email válido')
            .custom(async (value) => {
                console.log('Validando email...'); // Agrega este console log
                const existingUser = await Usuario.findOne({ where: { email: value } });
                if (existingUser) {
                    return Promise.reject('Este email ya está registrado');
                }
            }),

        body('password')
            .notEmpty().withMessage('La contraseña es obligatoria')
            .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),


    ],

    loginValidations: [
        body('email')
            .notEmpty().withMessage('El email es obligatorio')
            .isEmail().withMessage('Ingresa un formato de email válido')
            .custom(async (value) => {
                console.log('Validando email para login...'); // Agrega este console log
                const existingUser = await Usuario.findOne({ where: { email: value } });
                if (!existingUser) {
                    throw new Error('El mail o la contraseña son incorrectos');
                }
            }),

        body('password')
            .custom(async (value, { req }) => {
                if (!value) {
                    throw new Error('La contraseña es obligatoria');
                }
                const { email } = req.body;
                const existingUser = await Usuario.findOne({ where: { email } });
                if (existingUser) {
                    const passwordMatch = await bcrypt.compare(req.body.password, existingUser.contraseña); // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
                    if (!passwordMatch) {
                        throw new Error('La contraseña es incorrecta');
                    }
                }
            }),
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('register', { errors: errors.array() });
        }

        next();
    },

    validateLogin: (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('login', { errors: errors.array() });
        }

        next();
    }
};

module.exports = userValidations;