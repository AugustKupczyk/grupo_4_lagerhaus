const express = require ("express");
const multer = require('multer');
const userControllers = require("../controllers/userControllers");
const middlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/imgs/products');
    },
    filename: (req, file, cb) => {
        console.log(path.extname(file.originalname))
        cb(null, Date.now() + '-' + file.originalname);
    } 
});

const upload = multer({ storage }); 

// @GET - /users/sign-out
router.get('/sign-out', userControllers.signOut);

// @GET - /users/register
router.get('/register', middlewares.allowUnsignedIn, userControllers.getRegister);

// @POST - /users
router.post('/', userControllers.registerUser);

// @GET - /users/login
router.get('/login', middlewares.allowUnsignedIn, userControllers.getLogin);

// @POST - /users/login
router.post('/login', userControllers.loginUser);

// @GET - /users/profile
router.get('/:email/profile', middlewares.allowSignedIn, userControllers.getProfile);


module.exports = router; 
