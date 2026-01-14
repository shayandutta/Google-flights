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

async function getAirplanes(){
     try{
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
     }catch(error){
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
     }
}

module.exports = {
    createAirplane,
    getAirplanes
}