'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,  //this -> airport model belongs to the City model -> Airport has a city, (one to one relationship)
        {
          foreignKey: 'cityId', //foreignKey is the column name in the Airport table that references the City table
          onDelete: 'CASCADE', //onDelete is the action to take when the City is deleted
          as: 'cityDetails', //this alias is used in the flight-repository.js file to join the Flight and City tables
        })
        this.hasMany(models.Flight,{
          foreignKey: 'departureAirportId',
          onDelete: 'CASCADE',
        });
        this.hasMany(models.Flight,{
          foreignKey: 'arrivalAirportId',
          onDelete: 'CASCADE',
        });
    }
  }
  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};