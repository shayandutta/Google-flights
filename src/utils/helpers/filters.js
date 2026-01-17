//this file contains the helper functions for the filters
const { Op } = require("sequelize");


function getFlightFilters(query){
    let customFilter = {};

    //Filtering the flights by the trips -> departureAirportId and arrivalAirportId (example: MUM-LGB)
    if(query.trips){
        [departureAirportId, arrivalAirportId] =query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        //TODO: Add a check to see if the departureAirportId and arrivalAirportId are not same
    }

    //Filtering the flights by the price
    if(query.price){
        [minPrice, maxPrice] = query.price.split('-');
        customFilter.price = {
            [Op.between]:[(minPrice == undefined) ? 0 : minPrice, (maxPrice == undefined) ? 20000 : maxPrice]
        }
    }

    //Filtering the flights by the number of travellers
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]:query.travellers
        }
    }

    //Filtering the flights by the tripDate
    if(query.tripDate){
        // Convert tripDate string to Date object (start of day) for proper comparison 
        // The tripDate is in the format of YYYY-MM-DD, so we need to convert it to a Date object
        // The Date object will be in the format of YYYY-MM-DDT00:00:00.000Z which is how the departureTime is stored in the database
        const tripDateStart = new Date(query.tripDate);
        const tripDateEnd = new Date(tripDateStart);
        tripDateEnd.setDate(tripDateEnd.getDate() + 1); // Add 1 day to get end of tripDate
        customFilter.departureTime = {
            [Op.between] : [tripDateStart, tripDateEnd]
        }
    }


    return customFilter;
}


module.exports = {
    getFlightFilters
}

