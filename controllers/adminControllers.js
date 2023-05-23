const path = require ("path");

const controllers={
    getAgregar:(req,res) =>{
        res.render("agregar-producto");
    },
    getEditar:(req,res) =>{
        res.render("editar-producto");
    }
}

module.exports = controllers; 