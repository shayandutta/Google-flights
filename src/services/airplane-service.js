const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository(); //create an instance of the AirplaneRepository class

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane; //return the airplane to the controller
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot create a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  async function getAirplanes() {
    try {
      const airplanes = await airplaneRepository.getAll();
      return airplanes; //return the airplanes to the controller
    } catch (error) {
      throw error; //throw the error to the controller
    }
  }
}

module.exports = {
  createAirplane,
};
