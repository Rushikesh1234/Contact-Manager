/*
We need to give response from server side. For this, we need to create our own custom response body with our own defined fields.
We have created our own response handler in json formats.
*/

const {constants} = require("../constants");

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch(statusCode)
    {
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation Failed", message: err.message, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND: 
            res.json({title: "Not Found", message: err.message, stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED: 
            res.json({title: "Unauthorized", message: err.message, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN: 
            res.json({title: "Forbidden", message: err.message, stackTrace: err.stack});
            break;
        case constants.SERVER_ERROR: 
            res.json({title: "Forbidden", message: err.message, stackTrace: err.stack});
            break;
        default:
            console.log("No Error");
    }
};

module.exports = errorHandler;