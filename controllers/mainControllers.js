const path = require ("path");

const controllers={
    getIndex:(req,res) =>{
        res.sendFile(path.join(__dirname,"../views/index.html"));
    }
}

module.exports = controllers;