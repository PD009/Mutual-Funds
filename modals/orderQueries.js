var db = require('../config/dbconnection');
//var stringify = require('json-stringify-safe');

//Create

function createEntry(req,res,next){
    var reqObj = req.body.queryResult.parameters;
    console.log(reqObj);
    db.one('INSERT INTO investment_profile_assets(mobileno, interest_rate, amount, asset_investment_date, asset_maturity_date, typeasset, time_period) values($1, $2, $3, $4, $5, $6, $7)',
    [reqObj.mobileno,reqObj.interest_rate,reqObj.amount,reqObj.asset_investment_date,reqObj.asset_maturity_date, reqObj.typeasset, reqObj.time_period])
/*db.one("INSERT INTO investment_profile_assets (DEFAULT $1,$2,$3,$4,$5,$6,$7)",[
    reqObj.mobileno,
    reqObj.interest_rate,
    reqObj.amount,
    reqObj.asset_investment_date,
    reqObj.asset_maturity_date, 
    reqObj.typeasset,
    reqObj.time_period])*/
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