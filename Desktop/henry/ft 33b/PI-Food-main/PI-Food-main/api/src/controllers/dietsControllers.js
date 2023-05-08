const { default: axios } = require("axios");
// Requerimos el modelo de la tabla Diet de la base de datos
const { Diet } = require("../db");
const { getRecipesApi } = require("./recipesControllers");

const getDietsTypesApi = async () => {
  const recipesApi = await getRecipesApi();

  const dietAllApi = recipesApi.map((x) => x.diets);

  const dietsAll = [];

  dietAllApi.forEach((x) => x.forEach((y) => dietsAll.push(y)));

  dietsAll.push("vegetarian")

  return [...new Set(dietsAll),];
};

// 1-Llama a la función getRecipesApi de manera asíncrona para obtener un arreglo de objetos de recetas de cocina.
// 2-Luego, con la función map, creo un nuevo arreglo (dietAllApi) que contiene solamente los arrays de dietas de cada receta.
// 3-Crea un arreglo vacío (dietsAll) donde almacenará todas las dietas sin repeticiones.
// 4-Luego, utiliza un doble forEach para recorrer todos los arrays de dietas (x) dentro de dietAllApi y, dentro de cada uno de ellos, recorrer todas las dietas individuales (y) para agregarlas al arreglo dietsAll.
// 5-Finalmente, la función utiliza el constructor Set para crear un nuevo conjunto a partir de dietsAll, lo convierte de vuelta en un arreglo con (...) y lo retorna.
// En resumen, esta función retorna un arreglo con todas las dietas existentes en el conjunto de recetas obtenido de la API, sin repeticiones.


const getDietsTypesDb = async () => {
  // Utilizamos el metodo finAll de sequelize en el modelo Diet para acceder a todos los atributos
  const dietsAll = await Diet.findAll({
    // mediante la opcion attributes especificamos cuales son los unicos que queremos
    attributes: ["name", "id"],
  });

  // console.log(dietsAll);

  const dietsAllArray = [];

  dietsAll.forEach((dieta) => dietsAllArray.push({ name: dieta.name, id: dieta.id }));

  return dietsAllArray;

  // Recorremos dietAll para pushear en el nuevo array dietsAllArray todo nuevamente.
};

const postDiets = async () => {
  const dietsTypes = await getDietsTypesApi();
  let allDietTypes = dietsTypes.map((e) =>
    Diet.findOrCreate({ where: { name: e } })
  );
  Promise.all(allDietTypes).then((e) => console.log("Dietas Cargadas"));
};

module.exports = { getDietsTypesDb, getDietsTypesApi, postDiets };
