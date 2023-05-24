const express = require("express");
const app = express();
const rutasMain = require("./routes/mainRoutes.js");
const rutasProducto = require("./routes/productRoutes.js");
const rutasUser = require("./routes/userRoutes.js");
const rutasAdmin = require("./routes/adminRoutes.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", [path.join(__dirname, "./views"),
path.join(__dirname, "./views/users"),
path.join(__dirname, "./views/products"),
path.join(__dirname, "./views/admin")]);

app.use(express.static("public"));
app.use(rutasMain);
app.use("/products", rutasProducto);
app.use("/users", rutasUser);
app.use("/admin", rutasAdmin);

app.listen(3030, () => console.log("Levantando un servidor con Express, http://localhost:3030/"));
