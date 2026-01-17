'use strict';
const {
  Model
} = require('sequelize');
const {Enums} = require('../utils/common');
const {ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS}=Enums.SeatType; //Enums.SeatType is an object that contains all the enums for the SeatType
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey: 'airplaneId',
      })
    }
  }
  Seat.init({
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Airplanes',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM,
      values: [ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS],
      defaultValue: ECONOMY,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};