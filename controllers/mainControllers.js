const path = require ("path");

const controllers={
    getIndex:(req,res) =>{
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        res.render("index",{userData});
    },
    getFranquicias:(req,res) =>{
        res.render("franquicias");
    },
    getLocales: (req,res) =>{
        res.render("locales");
    }
}

module.exports = controllers;