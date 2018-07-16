var express = require('express');
var db = require('../modals/orderQueries');

 getName = function(req,res,next){
    //console.log("inside controller get name");
    // req = req.body.result.parameters;
    var message = '';
    /*var user_mobno = req.body.queryResult.parameters.mobileno;
    var interest_rate = req.body.queryResult.parameters.interest_rate;
    var amount=req.body.queryResult.parameters.amount;
    var asset_investment_date=req.body.queryResult.parameters.asset_investment_date;
    var asset_maturity_date=req.body.queryResult.parameters.asset_maturity_date;*/
    var type_asset = req.body.queryResult.parameters.typeasset;
    var time_period = req.body.queryResult.parameters.time_period;
    var type_liabilities = req.body.queryResult.parameters.typeliability;
    if(type_asset) {
        message = this.saveAssets(req);
    }
    if(type_liabilities){
        message = this.saveLiabilities(req);
    }

    console.log("req body", req.body);
    //  if (req.body.queryResult.parameters.mobileno) {
    //     user_mobno = req.body.queryResult.parameters.mobileno;
    //  }
    //  if (req.body.queryResult.parameters.interest_rate) {
    //     interest_rate = req.body.queryResult.parameters.interest_rate;
    //  }
    //  if (req.body.queryResult.parameters.amount) {
    //     amount = req.body.queryResult.parameters.amount;
    //  }
    //  if (req.body.queryResult.parameters.asset_investment_date) {
    //     asset_investment_date = req.body.queryResult.parameters.asset_investment_date;
    // }
    // if (req.body.queryResult.parameters.asset_maturity_date) {
    //     asset_maturity_date = req.body.queryResult.parameters.asset_maturity_date;
    // }
    // if (req.body.queryResult.parameters.typeasset) {
    //     type_asset = req.body.queryResult.parameters.typeasset;
    // }
    // if (req.body.queryResult.parameters.time_period) {
    //     time_period = req.body.queryResult.parameters.time_period;
    // }

    //     db.createEntry(req,res,next);
    //     db.createIP(req,res,next);
    //     var message = "Finished creating a profile for you. A OTP will be sent to your-"+ user_mobno +"Heres a summary of your assets.";
        return res.json({fulfillmentText : message});
    // res.send(res);
};

saveAssets = function(reqParam){
    db.createEntry(reqParam);
    var msg = "Finished creating an asset profile for you. Let's go to create your liabilities profile.";
    return msg;
};

saveLiabilities = function(reqParam){
    db.createIP(reqParam);
    var msg = "Finished creating your investment profile for you. An OTP will be sent to your registered mobile no.";
    return msg;
};

module.exports = {
    getName         :   getName
};