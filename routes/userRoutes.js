const express = require ("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

// @GET - /users/sign-out
router.get('/sign-out', userControllers.signOut);

// @GET - /users/register
router.get('/register', userControllers.getRegister);

// @POST - /users
router.post('/', userControllers.registerUser);

// @GET - /users/login
router.get('/login', userControllers.getLogin);

// @POST - /users/login
router.post('/login', userControllers.loginUser);

module.exports = router; 
