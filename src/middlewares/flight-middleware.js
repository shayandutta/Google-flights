const {ErrorResponse} = require('../utils/common')
const AppError = require("../utils/errors/app-error")
const {StatusCodes} = require("http-status-codes")

async function validateCreateFlight(req, res, next){
    if(!req.body.flightNumber){
        ErrorResponse.message = "Something went wrong while creating a city";
        ErrorResponse.error = new AppError(["Flight number is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = "Something went wrong while creating a city";
        ErrorResponse.error = new AppError(["airplaneId is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "Something went wrong while creating a city";
        ErrorResponse.error = new AppError(["arrivalAirportId is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = "Something went wrong while creating a city";
        ErrorResponse.error = new AppError(["departureAirportId is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = "Something went wrong while creating a city";
        ErrorResponse.error = new AppError(["arrivalTime is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message = "Something went wrong while creating a city";
        ErrorResponse.error = new AppError(["departureTime is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message = "Something went wrong while creating a city";
        ErrorResponse.error = new AppError(["price is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message = "Something went wrong while creating a city";
        ErrorResponse.error = new AppError(["totalSeats is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}


module.exports = {
    validateCreateFlight
};