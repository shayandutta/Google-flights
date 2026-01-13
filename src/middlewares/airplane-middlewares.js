const { StatusCodes } = require("http-status-codes");

function validateCreateRequest(req, res, next){
    if(!req.body.modelNumber){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:"Model number is required",
            error: {explanation:"Model number is required"},
            data: {}
        });
    }
    if(!req.body.capacity){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:"Capacity is required",
            error: {explanation:"Capacity is required"},
            data: {}
        });
    }
    next();
}

module.exports = {
    validateCreateRequest
}