var express = require('express');
var db = require('../modals/orderQueries');

 getName = function(req,res,next){
    //console.log("inside controller get name");
    // req = req.body.result.parameters;
    var message = '';

    var reqAction = req.body.queryResult.action;

    if(reqAction === 'getIPAssets') {
       this.saveAssets(req);
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
        return res.json({fulfillmentText : 'wrong number'});
    // res.send(res);
};

commonResponse= function(msg){
    console.log("Response", msg);
    return res.send({fulfillmentText : msg});
    //res.send(res);

}

saveAssets = function(reqParam){
    var param = reqParam.body.queryResult.parameters;
    var msg = '';
    console.log("save assets intent :::::::::::::");
    if (param.mobile_no) {
        var user_mobno= param.mobile_no;
        var mob = user_mobno.length;
       if( mob !== 10 ){
           console.log("not validated");
          msg="Please put in 10 digits of your mobile number properly.";
        //   this.commonResponse(msg);
       }
        else if(mob == 10 && param.mobile_no){
            console.log("mobile number validated:::::");
            // msg = "What is the rate of interest of the asset ?"
        }
    }
    // if(param.interest_rate){
    //     msg="What is the approximate worth of your amount?";
    // }
    // if(param.amount){
    //     console.log("amount:::::");
    //     msg="Looks great! When was your investment date?(YYYY-MM-DD)";
    // }
    // if(param.asset_investment_date){
    //     console.log("date format check------");
    
    //         msg="Good job. When is the date of maturity of your investment?(YYYY-MM-DD)";

        
    //}
    if(param.asset_maturity_date){
            console.log("date format check------");

                msg="What type of asset do you have(Gold, Real Estate, Savings, Equity)?";
           

    }
    if(param.typeasset){
        msg="Time period of your investment.";
    }

     if (param.time_period) {
         console.log("time period:::::::");
         var tst = db.createEntry(reqParam);
         console.log("db return msg :::::", tst);
         msg = "Finished creating an asset profile for you.Let's create your liabilities profile? If yes, type liability.";
            }
    console.log("returning message :::::::::::::"); 
    // return res.json({fulfillmentText : msg});
      
    
    //console.log("db entry donee :::::::::::::");    
    
    
    
       
};

saveLiabilities = function(reqParam){
    var param = reqParam.body.queryResult.parameters;
    var user_mobno=reqParam.body.queryResult.outputContexts[1].parameters.mobile_no;
    reqParam.body.queryResult.parameters.mobile_no = reqParam.body.queryResult.outputContexts[1].parameters.mobile_no; var msg = '';
    console.log("save assets intent :::::::::::::");
    
    if(param.interest_rate){
        
        msg="What is the approximate worth of your amount?";
    }
    if(param.amount){
        console.log("amount:::::");
        msg="Looks great! When did you start your liability?(YYYY-MM-DD)";
    }
    if(param.liability_investment_date){
        console.log("date format check------");
            msg="Good job. When does your liability end?(YYYY-MM-DD)";
        
    }
    if(param.liability_maturity_date){
            console.log("date format check------");
                msg="What type of liability do you have (home loan, personal loan)?";
             

    }
    if(param.typeliability){
        msg="Good job! Time period of your liabiliy?";
    }

     if (param.time_period) {
         console.log("time period:::::::");
          db.createIP(reqParam);
         msg = "Finished creating your investment profile for you. An OTP will be sent to your registered mobile no.Let's see what your goals are? If yes,type goals.";
};
         
console.log("db done---------------------------------"); 
    return msg;

}
    

saveGoals = function(reqParam){
    var param = reqParam.body.queryResult.parameters;
    reqParam.body.queryResult.parameters.mobile_no = reqParam.body.queryResult.outputContexts[1].parameters.mobile_no;
    if(param.goal_planned_date){
        msg="What is your investment goal?";
    }

    if(param.typegoals){
        msg = "Great job! It's always good to know your goals, so that you can focus better. Create your user profile next?If yes, type-user profile.";
        db.createIP_goals(reqParam);
    
    }
    

    return msg; 
};

saveUserProfile = function(reqParam){
    var param = reqParam.body.queryResult.parameters;
    reqParam.body.queryResult.parameters.mobile_no = reqParam.body.queryResult.outputContexts[1].parameters.mobile_no;

if(param.username){
    var name= param.username;
    msg="Great to know you "+ name ;

} 

if(param.email_addr){
    var email = param.email_addr;
    var pattern=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (email == null || pattern.test(email) == false ) {
            
                 msg = "Invalid email. Try again.\n";
             } 
                
    else{        
        
        msg="successfully done.Enter aadhar"
        }

}

if(param.aadhaar){
    var aadhno = param.aadhaar;
    var pattern=/^([0-9]{4})-([0-9]{4})-([0-9]{4})/;
        if (aadhno == null || pattern.test(aadhno) == false ) {
                 msg = "Invalid aadhar. Try again.\n";
             } 
                
    else{  
        db.createUserIP();      
     msg = "Well done! A summary of what's stored with us will be sent to your email.";
    return msg; 
                  }
}
}


module.exports = {
    getName         :   getName
};