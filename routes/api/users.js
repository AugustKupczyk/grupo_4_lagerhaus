const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/api/userControllersApi');

// Ruta para obtener la lista completa de usuarios
router.get('/', userControllers.getAllUsers);

// Ruta para obtener los detalles de un usuario en particular por su ID
router.get('/:id', userControllers.getUserById);

// Ruta para obtener la imagen de perfil de un usuario por su ID
router.get('/:id/profile-image', userControllers.getUserProfileImage);

module.exports = router;