var express = require('express');
var db = require('../modals/orderQueries');

 getName = function(req,res,next){
    console.log("inside controller get name");
    // req = req.body.result.parameters;
    var name = '';
    var foodItem = '';
    var qty = '';
    console.log("req body", req.body)
    // if (req.body.result.parameters.name) {
    //     name = req.body.result.parameters.name;
    // }
    // if (req.body.result.parameters.items) {
    //     foodItem = req.body.result.parameters.items;
    // }
    // if (req.body.result.parameters.number) {
    //     qty = req.body.result.parameters.number;
    // }
    //     db.createEntry(req,res,next);
        var message = "Hi Would you like to order anything else?";
        return res.json({fulfillmentText : message});
    // res.send(res);
}

module.exports = {
    getName         :   getName
};