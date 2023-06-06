const expressValidator = require('express-validator');

const validations = {
    validateCreateProduct: [

        expressValidator.body('category')
            .notEmpty().withMessage('La categoría no debe estar vacía')
            .custom((value) =>{
                const categoriasPermitidas = ["Tapeo", "Burgers", "Sin TACC", "Sandwiches", "Tragos y gaseosas", "Vegano", "Wraps", "Cerveza"];
                if (!categoriasPermitidas.includes(value)) {
                  throw new Error('La categoría debe ser una de las siguientes: Tapeo, Burgers, Wraps, Vegano, Sandwiches, Sin Tacc, Cerveza, Tragos y gaseosas');
                }
                return true;
            }),

        expressValidator.body('name')
            .notEmpty().withMessage('El nombre no debe estar vacío'),

        expressValidator.body('description')
            .notEmpty().withMessage('La descripción no debe estar vacía'),

        expressValidator.body('price')
            .isInt().withMessage('El precio debe ser un número')
            .notEmpty().withMessage('El precio no debe estar vacío'),
    ]
};

module.exports = validations; 