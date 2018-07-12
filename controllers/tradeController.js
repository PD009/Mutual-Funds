var express = require('express');
var db = require('../modals/orderQueries');

 getName = function(req,res,next){
    //console.log("inside controller get name");
    // req = req.body.result.parameters;
    var type_asset = req.body.queryResult.parameters.typeasset;
    var user_mobno = req.body.queryResult.parameters.mobileno;
    var interest_rate = req.body.queryResult.parameters.interest_rate;
    var amount=req.body.queryResult.parameters.amount;
    var asset_investment_date=req.body.queryResult.parameters.asset_investment_date;
    var asset_maturity_date=req.body.queryResult.parameters.asset_maturity_date;
    var time_period =req.body.queryResult.parameters.time_period;
    
    
    
    console.log("req body", req.body);
    // if (req.body.result.parameters.name) {
    //     name = req.body.result.parameters.name;
    // }
    // if (req.body.result.parameters.items) {
    //     foodItem = req.body.result.parameters.items;
    // }
    // if (req.body.result.parameters.number) {
    //     qty = req.body.result.parameters.number;
    // }
        db.createEntry(req,res,next);
        var message = "Finished creating a profile for you. A OTP will be sent to your-"+ user_mobno+"Note down your Investment goals?";
        return res.json({fulfillmentText : message});
    // res.send(res);
}

module.exports = {
    getName         :   getName
};