const express = require ("express");
const adminControllers = require("../controllers/adminControllers.js");
const router = express.Router();

router.get("/agregar-producto", adminControllers.getAgregar);
router.get("/editar-producto", adminControllers.getEditar);

module.exports = router;
