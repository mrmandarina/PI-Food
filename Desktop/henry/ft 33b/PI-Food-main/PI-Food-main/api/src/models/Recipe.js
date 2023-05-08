const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'recipe',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allownull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      summary: {
        type: DataTypes.TEXT,
      },
      healthScore: {
        type: DataTypes.INTEGER,
      },
      steps: {
        type: DataTypes.TEXT,
      }
    },
    { timestamps: false }  //timestamps agrega dos columnas nuevas al modelo : createdAt y updatedAt, lo ponemos en false para sacar estas dos columnas
  );
};