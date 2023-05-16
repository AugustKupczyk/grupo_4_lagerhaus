const path = require ("path");

const controllers={
    getLogin:(req,res) =>{
        res.sendFile(path.join(__dirname,"../views/users/login.html"));
    },
    getRegister:(req,res) =>{
        res.sendFile(path.join(__dirname,"../views/users/register.html"))
    }
}

module.exports = controllers;