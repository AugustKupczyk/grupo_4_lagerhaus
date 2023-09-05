const express = require("express");
const path = require("path");
const fs = require('fs');
const userDataMiddleware = require('./middlewares/userDataMiddleware');
const methodOverride = require("method-override");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');

const rutasMain = require("./routes/mainRoutes.js");
const rutasProducto = require("./routes/productRoutes.js");
const rutasUser = require("./routes/userRoutes.js");

const rutasUserApi = require('./routes/api/users');
const rutasProductsApi = require("./routes/api/products");

const app = express();

app.set("view engine", "ejs");

app.set("views", [
    path.join(__dirname, "./views"),
    path.join(__dirname, "./views/users"),
    path.join(__dirname, "./views/products"),
]);

// --- Middlewares ---
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(expressSession({
    secret: 'este es mi secreto monito123',
    resave: false,
    saveUninitialized: true
}));
app.use(cors());

// --- Custom Middleware to Attach User Data ---
app.use(userDataMiddleware);
app.use('/imgs/users', express.static(path.join(__dirname, 'public/imgs/users')));


// --- Routers ---
app.use(rutasMain);
app.use("/products", rutasProducto);
app.use("/users", rutasUser);
app.use('/api/users',rutasUserApi);
app.use("/api/products",rutasProductsApi);

app.use((req, res) => {
    res.render('404');
})

app.listen(3030, () => console.log("Levantando un servidor con Express, http://localhost:3030/"));
