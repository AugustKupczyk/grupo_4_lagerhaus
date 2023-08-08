const { body, validationResult } = require('express-validator');
const { Usuario } = require('../database/models'); // Asegúrate de importar el modelo de usuario

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

        // Agrega más validaciones aquí si es necesario
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('register', { errors: errors.array() });
        }

        next(); // Si las validaciones pasan, continúa al siguiente middleware o controlador
    }
};

module.exports = userValidations;