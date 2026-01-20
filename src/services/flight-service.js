const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/dateTimeHelpers");
const { Op } = require("sequelize");

//this is the helper function that will help us to get the flight filters
const {getFlightFilters} =require("../utils/helpers/filters");

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


async function deleteFlight(id){
    try{
        const deletedFlight = await flightRepository.destroy(id);
        return deletedFlight;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The flight you requested to delete could not be found", error.statusCode);
        }
        throw new AppError("Cannot delete flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

//MOVED ALL THE FILTERS LOGIC TO THE HELPER FUNCTION -> /src/utils/helpers/filters.js
async function getFlights(query){ 
    const {customFilter, sortFilter} = getFlightFilters(query); // destructuring the customFilter and sortFilter from the object returned by the getFlightFilters function 
    try{
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    }catch(error){
        throw new AppError("Cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

//this function is used to get a single flight by its id
async function getFlight(id){
    try{
        const flight = await flightRepository.get(id);
        return flight;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The flight you requested is not present", error.statusCode);
        }
        throw new AppError("Cannot fetch data of the flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data){
    try{
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    }catch(error){
        console.log(error);
        throw new AppError("Cannot update the seats of the flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    deleteFlight,
    getFlights,
    getFlight,
    updateSeats
}



//naming convention can be improved between repository and service layers.
//for the flights api, the name of both the repository and service are same -> getAllFlights
//changed the name of the service function to getFlights to avoid confusion.
