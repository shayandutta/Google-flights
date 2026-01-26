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
app.use('/flights-service', apiRoutes); //this is the service name that will be used to identify the service in the load balancer -> through reverse proxy on api gateway

app.listen(ServerConfig.PORT, ()=>{
    console.log(`Server is running on port ${ServerConfig.PORT}`);
})
