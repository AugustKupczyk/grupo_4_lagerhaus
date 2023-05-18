const path = require ("path");

const controllers={
    getLogin:(req,res) =>{
        res.render("login");
    },
    getRegister:(req,res) =>{
        res.render("register");
    }
}

module.exports = controllers;