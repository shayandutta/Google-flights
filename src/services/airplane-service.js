const { AirplaneRepository } = require("../repositories");

const airplaneRepository = new AirplaneRepository(); //create an instance of the AirplaneRepository class

async function createAirplane(data){
    try{
        const airplane = await airplaneRepository.create(data);
        return airplane;
    }catch(error){
        throw error;
    };
}

module.exports = {
    createAirplane
}