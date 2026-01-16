const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/dateTimeHelpers");

const flightRepository = new FlightRepository();

async function createFlight(data){
    try{
        if(compareTime(data.departureTime, data.arrivalTime)){
            throw new AppError('Departure time cannot be greater than arrival time', StatusCodes.BAD_REQUEST)
        }
        const response = await flightRepository.create(data);
        return response;
    }catch(error){
        //If its already an AppError(if the error is caught in the try block and its an instance of AppError class), rethrow it as it is
        if(error instanceof AppError){
            throw error;
        }
        if(error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Cannot create a new Flight object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight
}