var express = require('express');
var db = require('../modals/orderQueries');

 getName = function(req,res,next){
    //console.log("inside controller get name");
    // req = req.body.result.parameters;
    var message = '';

    var type_asset = req.body.queryResult.parameters.typeasset;
    var time_period = req.body.queryResult.parameters.time_period;
    var type_liabilities = req.body.queryResult.parameters.typeliability;
    var type_goals = req.body.queryResult.parameters.typegoals;  

    if(type_asset) {
        message = this.saveAssets(req);
    }
    if(type_liabilities){
        message = this.saveLiabilities(req);
    }
    if(type_goals){
        message = this.saveGoals(req);
    }
    if(username){
        message = this.UserProfile(req);
    }


    console.log("req body", req.body);

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

saveGoals = function(reqParam){
    db.createIP_goals(reqParam);
    var msg = "Great job! It's always good to know your goals, so that you can focus better. Create your user profile next?";
    return msg; 
};

saveUserProfile = function(reqParam){
    db.createUserIP(reqParam);
    var msg = "Well done here's a summary of what's stored with us of yours.";
    return msg; 
}

module.exports = {
    getName         :   getName
};