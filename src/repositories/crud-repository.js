const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  //data is an object
  async create(data) {
    const response = await this.model.create(data);
    return response; //return the response to the service
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response; //return the response to the service
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  async update(data, id) {
    //update with the data and update to the id
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    if (response[0] == 0) {
      //Check if response[0] === 0 (no rows affected) -> Sequelize's update() method returns an array: [numberOfAffectedRows]
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    const updatedResponse = await this.model.findByPk(id);
    return updatedResponse;
  }
}

module.exports = CrudRepository;
