const { Router } = require("express");
const {
    getRecipeIdHandler,
    getRecipesHandler,
    postRecipeHandler
} = require('../handlers/recipesHandlers')

const validate = (req, res, next) => {
    const { title, summary, healthScore, steps } = req.body
    if (!title) return res.status(400).json({ error: "missing title" })
    if (!summary) return res.status(400).json({ error: "missing summary" })
    if (!healthScore) return res.status(400).json({ error: "missing healthScore" })
    if (!steps) return res.status(400).json({ error: "missing steps" })

    next()
}

const recipesRouter = Router()

recipesRouter.get('/', getRecipesHandler);

recipesRouter.get('/:id', getRecipeIdHandler);

recipesRouter.get('/?name', getRecipesHandler);

recipesRouter.post('/', validate, postRecipeHandler);

module.exports = recipesRouter