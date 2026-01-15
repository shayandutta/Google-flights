'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Airport, { //this -> City model has many Airports -> City has many Airports, (one to many relationship)
        foreignKey: 'cityId', //foreignKey is the column name in the City table that references the Airport table
        onDelete: 'CASCADE', //onDelete is the action to take when the Airport is deleted
        onUpdate: 'CASCADE' //onUpdate is the action to take when the Airport is updated
      })
    }
  }
  City.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};