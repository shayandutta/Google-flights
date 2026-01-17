const CrudRepository = require('./crud-repository')
const {Flight} = require('../models')

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    //getAllFlights is a custom method that is not implemented in the CrudRepository class
    //filter is an object that contains the filter parameters
    //this is used to implement flight search filters 
    async getAllFlights(filter, sortFilter){
        const response = await Flight.findAll({
            where: filter, //filter is an object that contains the filter parameters, where the key is the column name and the value is the value of the column
            //how where works is that it will filter the flights by the filter parameters
            //so if the filter is {departureAirportId: 1, arrivalAirportId: 2}, then the flights will be filtered by the departureAirportId and arrivalAirportId
            order: sortFilter //sortFilter is an array of arrays, it will be like this: [['departureTime', 'ASC'], ['price', 'DESC']]
            //how order works is that it will sort the flights by the sort parameters
            //so if the sortFilter is [['departureTime', 'ASC'], ['price', 'DESC']], then the flights will be sorted by departureTime in ascending order and price in descending order
            })
        return response;
    }
}

module.exports = FlightRepository;