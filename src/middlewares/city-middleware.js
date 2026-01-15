const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateCity(req, res, next){
    if(!req.body.name){
        ErrorResponse.message = "Something went wrong while creating a city";
        ErrorResponse.error = new AppError(["City name is required"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateCity
}