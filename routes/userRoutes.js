const express = require("express");
const path = require('path');
const userControllers = require("../controllers/userControllers");
const middlewares = require("../middlewares/authMiddlewares");
const uploadImg = require('../middlewares/userImg');

const router = express.Router();

// @GET - /users/sign-out
router.get('/sign-out', userControllers.signOut);

// @GET - /users/register
router.get('/register', middlewares.allowUnsignedIn, userControllers.getRegister);

// @POST - /users
router.post('/', uploadImg.single('image'), userControllers.registerUser);

// @GET - /users/login
router.get('/login', middlewares.allowUnsignedIn, userControllers.getLogin);

// @POST - /users/login
router.post('/login', userControllers.loginUser);

// @GET - /users/profile/:email
router.get('/profile/:email', middlewares.allowSignedIn, userControllers.getProfile);

// @GET - /users/profile/:email/editar-perfil
router.get('/profile/:email/editar-perfil', middlewares.allowSignedIn, userControllers.getEditProfile);

// @PUT - /users/profile/:email/editar-perfil
router.put('/profile/:email/editar-perfil', [uploadImg.single('image'), middlewares.allowSignedIn], userControllers.editProfile);

module.exports = router;
