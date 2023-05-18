const path = require ("path");

const controllers={
    getIndex:(req,res) =>{
        res.render("index");
    },
    getFranquicias:(req,res) =>{
        res.render("franquicias");
    }
}

module.exports = controllers;