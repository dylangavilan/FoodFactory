const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
    },
    dishType: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
