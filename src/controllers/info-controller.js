const {StatusCodes} = require('http-status-codes');

const info = (req, res)=>{
    return res
    .status(StatusCodes.OK) //not plain raw status code, but a status code object from the http-status-codes package
    .json({
        success: true,
        message: 'Flights API is live',
        error: {},
        data: {}
    })
}

module.exports = {
    info
}