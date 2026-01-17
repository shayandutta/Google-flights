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
async function getAllFlights(query){ //we are going to get the query parameters from the request body
    // let customFilter = {}; //customFilter is an object that contains the custom filter parameters -> departureAirportId and arrivalAirportId
    // //1 -> trips=MUM-DEL
    // if(query.trips){
    //     [departureAirportId, arrivalAirportId] = query.trips.split('-'); // split the trips string into two parts and store them in the departureAirportId and arrivalAirportId variables
    //     customFilter.departureAirportId = departureAirportId; // set the departureAirportId in the customFilter object
    //     customFilter.arrivalAirportId = arrivalAirportId; // set the arrivalAirportId in the customFilter object
    //     //TODO: Add a check to see if the departureAirportId and arrivalAirportId are not same
    // }

    // if(query.price){
    //     [minPrice, maxPrice] = query.price.split('-');
    //     //cannot use customFilter.minPrice = minPrice; and customFilter.maxPrice = maxPrice; as it will not work with the sequelize query builder
    //     //we need to use the Op.gte and Op.lte operators to filter the prices
    //     // customFilter.minPrice = minPrice;
    //     // customFilter.maxPrice = maxPrice;
    //     customFilter.price = { 
    //         [Op.between]: [(minPrice == undefined) ? 0: minPrice, (maxPrice == undefined) ? 20000: maxPrice]  // if maxPrice is undefined(user did not provide a max price), set it to 20000
    //     } // Op.between is a operator that filters the prices between the minPrice and maxPrice


    //     // console.log(customFilter); -> output will be like this:

    //     // {
    //     //     departureAirportId: 'MUM',
    //     //     arrivalAirportId: 'LGB',
    //     //     price: { Symbol(between): [ '5000', '9000' ] }
    //     //   }
    // }

    // //travellers is the number of travellers the user is booking the flight for, and totalSeats if the total remaining seats in the flights. 
    // // So we need to filter out those flights where totalSeats is greater than or equal to the number of travellers.
    // if(query.travellers){
    //     customFilter.totalSeats = {
    //         [Op.gte]:query.travellers //gte is greater than or equal to
    //     }
    // }
    // try{
    //     const flights = await flightRepository.getAllFlights(customFilter);
    //     return flights;
    // }catch(error){
    //     throw new AppError("Cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
    // }

    const customFilter = getFlightFilters(query);
    try{
        const flights = await flightRepository.getAllFlights(customFilter);
        return flights;
    }catch(error){
        throw new AppError("Cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    deleteFlight,
    getAllFlights
}