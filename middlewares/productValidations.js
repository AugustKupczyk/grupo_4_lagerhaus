const { body, validationResult } = require('express-validator');

const productValidations = {
    createValidations: [
        body('name')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres')
            .custom((value, { req }) => {
                console.log('Validando nombre...'); // Agrega este console log
                return true;
            }),

        body('description')
            .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),

        // Agregar validación para la imagen
        body('image')
            .custom((value, { req }) => {
                console.log(req.file);
                if (!req.file) {
                    throw new Error('Debes seleccionar una imagen');
                }
                return true;
            })
    ],

    validateCreate: (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('agregar-producto', { errors: errors.array() });
        }

        next();
    }
};

module.exports = productValidations;