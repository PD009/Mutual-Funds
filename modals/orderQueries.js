var db = require('../config/dbconnection');
//var stringify = require('json-stringify-safe');



//Create

async function createEntry(req,res,next){
    var reqObj = req.body.queryResult.parameters;
    console.log(reqObj);
    db.one("INSERT INTO investment_profile_assets(mobile_no, interest_rate, amount, asset_investment_date, asset_maturity_date, typeasset, time_period) values($1, $2, $3, $4, $5, $6, $7)",
    [reqObj.mobile_no,reqObj.interest_rate,reqObj.amount,reqObj.asset_investment_date,reqObj.asset_maturity_date,reqObj.typeasset, reqObj.time_period])
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
        var msg = '';
        if(error.code == 23505) {
            msg = 'User exists';
            console.error('sql existence error');
        }
        console.error('createEntry SQL :::::::', error.code);
        console.error('createEntry SQL error: ', msg);
        return msg;
    });
    
};

    function createIP(req,res,next){
        var reqObj = req.body.queryResult.parameters;
        console.log(reqObj);
        db.one('INSERT INTO investment_profile_liabilities(mobile_no, interest_rate, amount, liability_investment_date, liability_maturity_date, typeliability, time_period) values($1, $2, $3, $4, $5, $6, $7)',
        [reqObj.mobile_no,reqObj.interest_rate,reqObj.amount,reqObj.liability_investment_date,reqObj.liability_maturity_date,reqObj.typeliability, reqObj.time_period])
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
            console.error('createIP SQL error: ', error);
        });


    };

   function createIP_goals(req,res,next) {
       var reqObj = req.body.queryResult.parameters;
       console.log(reqObj);
       db.one('INSERT INTO investment_goal(mobile_no, goal_planned_date, typegoals) values($1, $2, $3)',
       [reqObj.mobile_no, reqObj.goal_planned_date,reqObj.typegoals])
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
        console.error('createIP_goals SQL error: ', error);
    });



};

function createUserIP(req,res,next) {
    var reqObj = req.body.queryResult.parameters;
    console.log(reqObj);
    db.one('INSERT INTO user_profile(mobile_no, username, email_addr, aadhaar) values($1, $2, $3, $4 )',
    [reqObj.mobile_no, reqObj.username, reqObj.email_addr, reqObj.aadhaar])
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
     console.error('createUserIP SQL error: ', error);
 });



};

module.exports = {
    createEntry      : createEntry,
    createIP         : createIP,
    createIP_goals   : createIP_goals,
    createUserIP     : createUserIP


};