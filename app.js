const express = require ("express");
const app = express();
const path = require ("path");

app.use(express.static("public"));
app.listen(3030,() => console.log("Levantando un servidor con Express"));



app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/index.html"));
});

app.get("/carritoCompras", function(req,res){
    res.sendFile(path.join(__dirname,"/views/productChart.html"));
});

app.get("/detalleProducto", function(req,res){
    res.sendFile(path.join(__dirname,"/views/productDetail.html"));
});

app.get("/register", function(req,res){
    res.sendFile(path.join(__dirname,"/views/register.html"));
});

app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname,"/views/login.html"));
});


