const {
	getRecipesApi,
	getRecipesDb,
	getRecipeById,
} = require("../controllers/recipesControllers");

const { Recipe } = require("../db");

const getRecipesHandler = async (req, res) => {
	const { name } = req.query;

	const [api, db] = await Promise.all([getRecipesApi(), getRecipesDb()]);

	const allRecipes = [...api, ...db];

	if (name) {
		try {
			let filterRecipe = allRecipes.filter((x) =>
				x.title.toLowerCase().includes(name.toLowerCase())
			);

			filterRecipe.length
				? res.status(200).send(filterRecipe)
				: res.status(401).json({ error: error.message });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	} else { 
		res.send(allRecipes);
	}
};

const getRecipeIdHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const recipe = await getRecipeById(id);
		res.status(200).json(recipe);
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
};

const postRecipeHandler = async (req, res) => {
	const { title, summary, healthScore, steps, image, diets } = req.body;
	try {
		let recipe = await Recipe.create({
			title,
			summary,
			healthScore,
			steps,
			image,
		});
		await recipe.addDiet(diets);
		res.status(200).json(recipe)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}

};

module.exports = { getRecipeIdHandler, getRecipesHandler, postRecipeHandler };


// const {
// 	getRecipesApi,
// 	getRecipesDb,
// 	getRecipeById,
// } = require("../controllers/recipesController");

// const { Recipe } = require("../db");

// const getRecipesHandler = async (req, res) => {
// 	const { name } = req.query;

// 	const [api, db] = await Promise.all([getRecipesApi(), getRecipesDb()]);

// 	const allRecipes = [...api, ...db];

// 	if (name) {
// 		try {
// 			let filterRecipe = allRecipes.filter((x) =>
// 				x.title.toLowerCase().includes(name.toLowerCase())
// 			);

// 			filterRecipe.length
// 				? res.status(200).send(filterRecipe)
// 				: res.status(401).send("No existe receta con ese nombre");
// 		} catch (error) {
// 			return res.status(401).send("Error");
// 		}
// 	} else {
// 		res.send(allRecipes);
// 	}
// };

// const getRecipeHandler = async (req, res) => {
// 	const { id } = req.params;

// 	const recipe = await getRecipeById(id);
// 	res.status(200).json(recipe);
// };

// const postRecipeHandler = async (req, res) => {
// 	const { title, summary, healthScore, steps, image, diets } = req.body;

// 	let recipe = await Recipe.create({
// 		title,
// 		summary,
// 		healthScore,
// 		steps,
// 		image,
// 	});
// 	await recipe.addDiet(diets);
// 	res.send("Ok");
// };

// module.exports = { getRecipeHandler, getRecipesHandler, postRecipeHandler };
