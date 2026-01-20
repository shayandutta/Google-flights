const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createFlight(req, res){
    try{
        const createFlight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = createFlight;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse)
    }
}

async function deleteFlight(req, res){
    try{
        const deletedFlight = await FlightService.deleteFlight(req.params.id);
        SuccessResponse.data = deletedFlight;
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


async function getAllFlights(req, res){
    try{
        const flights = await FlightService.getFlights(req.query);
        SuccessResponse.data = flights;
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


async function getFlight(req, res){
    try{
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error = error;
        return res
        .status(error.statuCode)
        .json(ErrorResponse)
    }
}


module.exports = {
    createFlight,
    deleteFlight,
    getAllFlights,
    getFlight
}