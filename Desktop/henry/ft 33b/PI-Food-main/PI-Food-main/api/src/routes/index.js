const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipesRouter = require('../routes/recipesRouter.js')
const dietsRouter = require('../routes/dietsRouter.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipesRouter)
router.use("/diets", dietsRouter)

module.exports = router;
