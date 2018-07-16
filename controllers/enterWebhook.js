var express = require('express');
var db = require('../modals/orderQueries');

 getName = function(req,res,next){

    var user_mobno = req.body.queryResult.parameters.mobileno;

      console.log("req body", req.body);
      if (req.body.queryResult.parameters.typeasset) {
        db.createEntry(req,res,next);
        var message = "Finished creating the asset profile for you.Fill in the further details for your liability profile.";
        return res.json({fulfillmentText : message});
    }
      if (req.body.queryResult.parameters.typeliability) {
        db.createIP(req,res,next);
        var message = "Finished creating a profile for you. An OTP will be sent to your-"+ user_mobno +"Heres a summary of your assets.";
        return res.json({fulfillmentText : message});
    }
 }

 module.exports = {
    getName         :   getName
};
