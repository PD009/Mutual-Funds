var db = require('../config/dbconnection');
//var stringify = require('json-stringify-safe');

//Create

function createEntry(req,res,next){
    var reqObj = req.body.queryResult.parameters;
    console.log(reqObj);
    db.one("INSERT INTO user_profile values(DEFAULT,$1)",[reqObj.username])
    .then(function(result){
        var message = {status:"success",
                       message:"record inserted",
                       id:result}
        console.log("query successful : ", message);
        // return res.status(200)
        //    .json({status:"success",
        //          message:"record inserted",
        //          id:result})
    }).catch(function(error){
        console.error('SQL error: ', error);
    });
};

module.exports = {
    createEntry    : createEntry
};