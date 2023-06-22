const path = require ("path");

const controllers={
    getIndex:(req,res) =>{
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        res.render("index", {userData} );
    }, 
    getFranquicias:(req,res) =>{
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        res.render("franquicias", {userData} );
    },
    getLocales: (req,res) =>{
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        res.render("locales", {userData} );
    }
}

module.exports = controllers;