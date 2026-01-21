const CrudRepository = require('./crud-repository')
const {Flight, Airplane, Airport, City} = require('../models')
const {Sequelize} = require('sequelize')

const db = require('../models')

const {addRowLockOnFlights} = require('./queries')

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
            order: sortFilter ,//sortFilter is an array of arrays, it will be like this: [['departureTime', 'ASC'], ['price', 'DESC']]
            //how order works is that it will sort the flights by the sort parameters
            //so if the sortFilter is [['departureTime', 'ASC'], ['price', 'DESC']], then the flights will be sorted by departureTime in ascending order and price in descending order
            include: [
                //this one is simple because the association is done on the primary key of the Airplane table
                {
                    model: Airplane,
                    required: true,//requied : true means that the flight must have an airplane
                    as: 'airplaneDetails',
                },
                //this one is more complex because the association is done on the code column of the Airport table
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on : { //on is used to inner join the Flight and Airport tables on the code column of the Airport table
                        col1: Sequelize.where(Sequelize.col('Flight.departureAirportId'), '=', Sequelize.col("departureAirport.code")), // col1 is the column name in the Flight table that is being joined with the Airport table
                        //Sequelize.col is used to get the column name from the Flight table
                        //Sequelize.where is used to compare the column values
                        //Sequelize.col("departureAirport.code") is used to get the column name from the Airport table, "departureAirport" is the alias of the Airport table
                    },
                    include: [
                        {
                            model: City,
                            required: true,
                            as: 'cityDetails',
                        }
                    ]
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1:Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), '=', Sequelize.col("arrivalAirport.code")),
                    },
                    include: [
                        {
                            model: City,
                            required: true,
                            as: 'cityDetails',
                        }
                    ]
                }
            ]
        })
        return response;
    }

    //this function is used to update the remaining seats of a flight
    //flightId is the id of the flight
    //seats is the number of seats to update
    //dec is a boolean value that indicates if the seats should be decremented or incremented
    //if dec is true, the seats will be decremented
    //if dec is false, the seats will be incremented
    async updateRemainingSeats(flightId, seats, dec=true){
        const t = await db.sequelize.transaction();  //transaction initialization
        try{
            await db.sequelize.query(addRowLockOnFlights(flightId)); //FOR UPDATE is used to lock the flight row for the current transaction( pessimistic locking)
            //pessimistic locking assumes conflicts are common, locking the row for the current transaction to prevent anyone else from changing it until the transaction finishes.
            const flight = await Flight.findByPk(flightId);
            if(dec){
                await flight.decrement('totalSeats', {by: seats}, {transaction : t}); //transaction argument -> this query will be executed in the transaction -> rollback will be applied if the query fails
            }else{
                await flight.increment('totalSeats', {by: seats}, {transaction : t}); 
            }
            await t.commit();
            return flight;
        }catch(error){
            await t.rollback();
            throw error;
        }
    }
}

module.exports = FlightRepository;