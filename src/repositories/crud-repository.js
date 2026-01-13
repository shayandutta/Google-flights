const { Logger } = require("../config");

class CrudRepository {
    constructor(model){
        this.model = model;
    }

    //data is an object
    async create(data){
        try{
            const response = await this.model.create(data);
            return response;
        }catch(error){
            Logger.error("Something went wrong in the crud repository layer: create");
            throw error;
        }
    }

    async destroy(data){
        try{
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return response;
        }
        catch(error){
            Logger.error("Something went wrong in the crud repository layer: destroy");
            throw error;
        }
    }

    async get(data){
        try{
            const response = await this.model.findByPK(data);
            return response;
        }catch(error){
            Logger.error("Something went wrong in the crud repository layer: get");
            throw error;
        }
    }

    async getAll(){
        try{
            const response = await this.model.findAll();
            return response;
        }catch(error){
            Logger.error("Something went wrong in the crud repository layer: getAll");
            throw error;
        }
    }

    async update(data, id){ //update with the data and update to the id
        try{
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        }catch(error){
            Logger.error("Something went wrong in the crud repository layer: update");
            throw error;
        }
    }
}


module.exports = CrudRepository;