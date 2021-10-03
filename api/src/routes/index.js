
const express = require("express");
const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dietasRouter = require("./dietas");
const recetasRouter = require("./recetas");
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());
//LE ACLARO QUE TODO EL ARCHIVO VA A TENER PREDETERMINADAMENTE ESE PREFIJO
router.use("/dietas", dietasRouter);
router.use("/recetas", recetasRouter);
module.exports = router;
