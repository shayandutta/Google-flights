const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

async function validateUpdateAirport(req, res, next){
    if(!req.body || Object.keys(req.body).length === 0){
        ErrorResponse.message="Something went wrong while updating the airport"
        ErrorResponse.error = new AppError("enter fields to be updated", StatusCodes.BAD_REQUEST)
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

async function validateCreateAirport(req, res, next){
    if(!req.body.name){
        ErrorResponse.message = "Something went wrong while createing the airport";
        ErrorResponse.error= new AppError(["airport name is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message = "Something went wrong while creating the airport";
        ErrorResponse.error= new AppError(["airport cityId is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.code){
        ErrorResponse.message = "Something went wrong while createing the airport";
        ErrorResponse.error= new AppError(["airport code is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    //address is nullable
    // if(!req.body.address){
    //     ErrorResponse.message = "Something went wrong while createing the airport";
    //     ErrorResponse.error= new AppError(["airport address is required"], StatusCodes.BAD_REQUEST);
    //     return res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json(ErrorResponse);
    // }
    next();
}


module.exports = {
    validateUpdateAirport,
    validateCreateAirport
}