var express = require('express');
var db = require('../modals/orderQueries');

 getName = function(req,res,next){
    //console.log("inside controller get name");
    // req = req.body.result.parameters;
    var message = '';

    var reqAction = req.body.queryResult.action;

    if(reqAction === 'getIPAssets') {
        message = this.saveAssets(req);
    }
    if(reqAction === 'getIPLiabilities'){
        message = this.saveLiabilities(req);
    }
    if(reqAction === 'getGoals'){
        message = this.saveGoals(req);
    }
    if(reqAction === 'getUserProfile'){
        message = this.saveUserProfile(req);
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
    var param = reqParam.body.queryResult.parameters;
    var msg = '';
    console.log("save assets intent :::::::::::::");
    if (param.mobile_no) {
        var user_mobno= param.mobile_no;
        var mob = user_mobno.length;
       if( mob !== 10 ){
           console.log("not validated");
          msg="Please put in 10 digits of your mobile number properly."
       }
        else if(mob == 10 && param.mobile_no){
            console.log("mobile number validated:::::");
            msg = "What is the rate of interest of the asset ?"
        }
    }
    if(param.interest_rate){
        msg="What is the approximate worth of your amount?";
    }
    if(param.amount){
        console.log("amount:::::");
        msg="Looks great! When was your investment date?(YYYY-MM-DD)";
    }
    if(param.asset_investment_date){
        console.log("date format check------");
        var doai = param.asset_investment_date;
        var pattern=/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/;
        if (doai == null || pattern.test(doai) == false ) {
            msg = "Invalid date of investment. Please enter the date in the format specified.\n";
        
        }
        else {
            msg="Good job. When is the date of maturity of your investment?(YYYY-MM-DD)";
        }

    if(param.asset_maturity_date){
            console.log("date format check------");
            var doam = param.asset_maturity_date;
            var pattern=/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/;
            if (doam == null || pattern.test(doam) == false ) {
                msg = "Invalid date of investment. Please enter the date in the format specified.\n";
            
            }
            else {
                msg="Good job. When is the date of maturity of your investment?(YYYY-MM-DD)";
            }

    }



            //return true;
            // db.createEntry(reqParam);
            if (param.time_period) {
                console.log("time period:::::::");
                msg = "Finished creating an asset profile for you.Let's create your liabilities profile? If yes, type liability.";
            }
    return msg;
};

saveLiabilities = function(reqParam){
    reqParam.body.queryResult.parameters.mobile_no = reqParam.body.queryResult.outputContexts[1].parameters.mobile_no;
    console.log('query context ::::::::',reqParam.body.queryResult.outputContexts);
    console.log('query context ::::::::',reqParam.body.queryResult.outputContexts[0]);
    console.log('save liablities ::::::::',reqParam.body.queryResult.parameters);
    //var user_mobno=reqParam.body.queryResult.outputContexts[1].parameters.mobile_no;
 
    db.createIP(reqParam);
    var msg = "Finished creating your investment profile for you. An OTP will be sent to your registered mobile no.Let's see what your goals are? If yes,type goals.";
    return msg;
};

saveGoals = function(reqParam){
    reqParam.body.queryResult.parameters.mobile_no = reqParam.body.queryResult.outputContexts[1].parameters.mobile_no;
    db.createIP_goals(reqParam);
    var msg = "Great job! It's always good to know your goals, so that you can focus better. Create your user profile next?If yes, type-user profile.";
    return msg; 
};

saveUserProfile = function(reqParam){
    reqParam.body.queryResult.parameters.mobile_no = reqParam.body.queryResult.outputContexts[1].parameters.mobile_no;
    db.createUserIP(reqParam);
    var msg = "Well done! A summary of what's stored with us will be sent to your email.";
    return msg; 
}

module.exports = {
    getName         :   getName
};