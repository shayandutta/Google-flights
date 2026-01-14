const { Logger } = require("../config");

class CrudRepository {
    constructor(model){
        this.model = model;
    }

    //data is an object
    async create(data){
            const response = await this.model.create(data);
            return response; //return the response to the service
    }

    async destroy(data){
        const response = await this.model.destroy({
            where: {
                id: data
            }
        });
        return response; //return the response to the service
    }

    async get(data){
        const response = await this.model.findByPK(data);
        return response;
    }

    async getAll(){
        const response = await this.model.findAll();
        return response;
    }

    async update(data, id){ //update with the data and update to the id
        const response = await this.model.update(data, {
            where: {
                id: id
            }
        });
        return response;
    }
}


module.exports = CrudRepository;