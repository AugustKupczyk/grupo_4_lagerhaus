const express = require ("express");
const path = require('path');
const userControllers = require("../controllers/userControllers");
const middlewares = require("../middlewares/authMiddlewares");
const uploadImg = require('../middlewares/userImg')

const router = express.Router();

// @GET - /users/sign-out
router.get('/sign-out', userControllers.signOut);

// @GET - /users/register
router.get('/register', middlewares.allowUnsignedIn, userControllers.getRegister);

// @POST - /users
router.post('/',uploadImg.single('image'), userControllers.registerUser);

// @GET - /users/login
router.get('/login', middlewares.allowUnsignedIn, userControllers.getLogin);

// @POST - /users/login
router.post('/login', userControllers.loginUser);

// @GET - /users/profile
router.get('/:email/profile', middlewares.allowSignedIn, userControllers.getProfile);


module.exports = router; 
