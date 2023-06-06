const express = require("express");
const path = require("path");
const fs = require('fs');
const methodOverride = require("method-override");
const morgan = require('morgan');

const rutasMain = require("./routes/mainRoutes.js");
const rutasProducto = require("./routes/productRoutes.js");
const rutasUser = require("./routes/userRoutes.js");

const app = express();

app.set("view engine", "ejs");

app.set("views", [
    path.join(__dirname, "./views"),
    path.join(__dirname, "./views/users"),
    path.join(__dirname, "./views/products"),
]);


// --- Middlewares ---
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan('tiny'));

app.use((req, res, next) => {
    const ruta = req.originalUrl + '\n';
    fs.appendFileSync(path.join(__dirname, './data/rutas.txt'), ruta);
    next();
});

// --- Routers ---
app.use(rutasMain);
app.use("/products", rutasProducto);
app.use("/users", rutasUser);

app.use((req, res) => {
    res.render('404');
})

app.listen(3030, () => console.log("Levantando un servidor con Express, http://localhost:3030/"));
