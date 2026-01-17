const CrudRepository = require('./crud-repository')
const {Flight} = require('../models')

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    //getAllFlights is a custom method that is not implemented in the CrudRepository class
    //filter is an object that contains the filter parameters
    //this is used to implement flight search filters 
    async getAllFlights(filter){
        const response = await Flight.findAll({
            where: filter
        })
        return response;
    }
}

module.exports = FlightRepository;