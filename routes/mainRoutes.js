const express = require ("express");
const mainControllers = require("../controllers/mainControllers.js");
const router = express.Router();

router.get("/", mainControllers.getIndex);
router.get("/franquicias", mainControllers.getFranquicias);

module.exports = router;
