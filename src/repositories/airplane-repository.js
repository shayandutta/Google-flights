const {CrudRepository} = require('./crud-repository');
const {Airplane} = require('../models');


//all the basic crud operations are already implemented in the crud-repository.js file and are inherited by the AirplaneRepository now.
//so we don't need to implement them again. Redundancy is avoided.
class AirplaneRepository extends CrudRepository{
    constructor(){
        super(Airplane);
    }
}

module.exports =  AirplaneRepository;