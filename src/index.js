const express = require('express');

const apiRoutes = require('./routes')   //named import from the routes directory index.js file

const {PORT} =require('./config') //if importing an index.js file, we can omit the index.js from the path, as long as we import from the directory name.


const app = express();

app.use('/api' , apiRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
