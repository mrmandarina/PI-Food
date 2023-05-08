const { getDietsTypesDb } = require("../controllers/dietsControllers");

const getDietsHandler = async (req, res) => {
  res.send(await getDietsTypesDb());
};

module.exports = { getDietsHandler };
