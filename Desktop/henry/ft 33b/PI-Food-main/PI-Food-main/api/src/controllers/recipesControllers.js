require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const { Recipe, Diet } = require("../db");

const getRecipesApi = async () => {
	const responseApi = await axios.get(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
	);

	return responseApi.data.results.map((x) => {
		return {
			id: x.id,
			title: x.title,
			summary: x.summary,
			healthScore: x.healthScore,
			steps: x.steps,
			image:
				x.image ||
				"https://img.freepik.com/vector-gratis/cute-burger-chef-thumbs-up-cartoon-icon-illustration-icono-chef-comida-aislado-estilo-dibujos-animados-plana_138676-3109.jpg?w=826&t=st=1683482252~exp=1683482852~hmac=3cd44fea5ab2528c5b90594ea467285a5d90b10200dcd3d1b57bcf32a17f1607",
			diets: x.diets,
		};
	});
};

const getRecipesDb = async () => {
	const respuesta = await Recipe.findAll({
		attributes: ["id", "title", "summary", "healthScore", "steps", "image"],
		include: { model: Diet },
	});

	return await respuesta.map((x) => {
		return {
			id: x.dataValues.id,
			title: x.dataValues.title,
			summary: x.dataValues.summary,
			healthScore: x.dataValues.healthScore,
			steps: x.dataValues.steps,
			image:
				x.dataValues.image ||
				"https://st3.depositphotos.com/1064969/18252/v/450/depositphotos_182528054-stock-illustration-flat-grayscale-icon-burger.jpg",
			diets: x.dataValues.diets.map((y) => y.name),
		};
	});
};

const getRecipeById = async (id) => {
	const source = isNaN(id) ? "bdd" : "api";

	if (source === "api") {
		const recipe = await axios.get(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&number=100`
		);
		return {
			id: recipe.data.id,
			title: recipe.data.title,
			summary: recipe.data.summary,
			healthScore: recipe.data.healthScore,
			steps: recipe.data.analyzedInstructions[0].steps,
			image: recipe.data.image,
			diets: recipe.data.diets,
		};
	}

	return await Recipe.findByPk(id);

	
};

module.exports = { getRecipesApi, getRecipesDb, getRecipeById };


// recipe =
	// 	source === "api"
	// 		? await axios.get(
	// 				`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&number=100`
	// 		  )
	// 		: await Recipe.findByPk(id);
	// return source === "api" ? recipe.data : recipe;