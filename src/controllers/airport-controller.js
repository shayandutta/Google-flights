const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirport(req, res){
    try{
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        SuccessResponse.data = airport;
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


async function getAirports(req, res){
    try{
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
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


async function getAirport(req, res){
    try{
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse)
    }
}


async function deletedAirport(req, res){
    try{
        const deletedAirport = await AirportService.deleteAirport(req.params.id);
        SuccessResponse.data = deletedAirport;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse)
    }
}

async function updateAirport(req, res){
    try{
        const updatedAirport = await AirportService.updateAirport(req.body, req.params.id)
        SuccessResponse.data = updatedAirport;
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

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deletedAirport,
    updateAirport
}