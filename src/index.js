const express = require('express');

const apiRoutes = require('./routes')   //named import from the routes directory index.js file

const {ServerConfig, Logger} =require('./config') //if importing an index.js file, we can omit the index.js from the path, as long as we import from the directory name.
const { swaggerUi, swaggerSpec } = require('./config/swagger-config');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); //to parse the body of the request if it is in the form of x-www-form-urlencoded
//extended: true -> uses qs library to parse the body of the request 
//extended: false -> uses querystring library to parse the body of the request
//qs library is a more powerful library than querystring library as it can parse nested objects and arrays.

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api' , apiRoutes);

app.listen(ServerConfig.PORT, async()=>{
    console.log(`Server is running on port ${ServerConfig.PORT}`);

    //bad code alert -> this part is to find the power of ORMs
    //if we setup model level constraints like hasmany, belongsTo etc., then sequelize will on the go creates some functions for you  by default that we never wrote, but can use directly using the models.
    // const {City, Airport} = require('./models');
    // const city = await City.findByPk(2);
    // console.log(city);
    // const airport = await Airport.create({name: "Kampegowda Airport", code: "BLR", cityId: 2});
    // const airport = await city.createAirport({name: "some Airport", code: "SOM"}); //camel case is important here, as sequelize will create a function for you by default that we never wrote, but can use directly using the models.
    // console.log(airport);
    // const city = await City.findByPk(3);
    // const airport = await city.createAirport({name: "Margherita Airport", code:"MRG"})
    // console.log(airport)
    // console.log(city);
    // await City.destroy({
    //     where:{
    //         id: 3
    //     }
    // })
})
