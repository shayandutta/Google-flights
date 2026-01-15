const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { CityService } = require("../services");

async function createCity(req, res){
    try{
        const city = await CityService.createCity({
            name: req.body.name
        })
        SuccessResponse.data = city;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}


async function deleteCity(req, res){
    try{
        const deletedCity = await CityService.deleteCity(req.params.id);
        SuccessResponse.data = deletedCity;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function updateCity(req, res){
    try{
        const updatedCity = await CityService.updateCity(req.body, req.params.id);
        SuccessResponse.data = updatedCity;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse)
    }
}


module.exports={
    createCity,
    deleteCity,
    updateCity
}