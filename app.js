const express = require ("express");
const app = express();
const path = require ("path");

app.use(express.static("public"));
app.listen(3030,() => console.log("Levantando un servidor con Express, puerto 3030"));

app.get("/home", function(req,res){
    res.sendFile(path.join(__dirname,"/views/index.html"));
});

app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname,"/views/login.html"));
});

app.get("/register", function(req,res){
    res.sendFile(path.join(__dirname,"/views/register.html"));
});

app.get("/menu", function(req,res){
    res.sendFile(path.join(__dirname,"/views/menu.html"));
});

app.get("/carrito-compras", function(req,res){
    res.sendFile(path.join(__dirname,"/views/carrito-compras.html"));
});

app.get("/detalle-producto", function(req,res){
    res.sendFile(path.join(__dirname,"/views/detalle-producto.html"));
});

app.get("/confirmacion-producto", function(req,res){
    res.sendFile(path.join(__dirname,"/views/confirmacion-producto.html"));
});


