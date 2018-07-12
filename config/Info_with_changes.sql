DROP DATABASE IF EXISTS info;

CREATE DATABASE info;

 

\c info;

 

CREATE SEQUENCE id_seq;

ð  Each table should have a separate field id_seq; so not sure if this is required


CREATE TABLE investment_profile(

mobile_no       int(10)    PRIMARY KEY,  --users mobile number

)INHERITS (assets),

INHERITS(liabilities);

ð  Not sure if you need the investment_profile table separately (see comments below)

ð  Might be easier to put mobile_no as a field in the assets and liabilities tables

 

CREATE TABLE assets (

rate_of_integer         float(2),  --in percentage

amount                  int(50),   --approx net worth

date_invest             date,  --date of the investment (MDY format)

date_maturity           date,  --date of the investment maturity (MDY format)

time_period             time  --time period of the investment only years

)INHERITS (type_asset);

 

ð  assets -> investment_profile_assets

ð  Might be easier to make all fields varchar except for maybe date fields?

ð  rate_of_integer -> interest_rate

ð  date_invest -> asset_investment_date

ð  date_maturity -> asset_maturity_date

ð  time_period -> should also support months (maybe best to represent the period in months)

ð  Have a field time_recorded for each asset

 

CREATE TABLE type_asset(

typeasset            varchar(50), --types of asset investment

);

ð  type_asset -> assets_types_master

 

CREATE TABLE liabilities (

rate_of_integer     float,  --in percentage

amount              int(50),   --approx net worth

date_loan           date,  --date of the liability  (MDY format)

date_end           date,  --date of the liability ends  (MDY format)

time_period         time  --time period of the investment only years

)INHERITS (type_liability);

 

ð  liabilities -> investment_profile_liabilities

ð  Other comments similar to assets

CREATE TABLE type_liability(

typeliability            varchar(50) --types of asset investment

);

 

ð  type_liability -> liabilities_types_master

 

CREATE TABLE user_profile(

user_id integer NOT NULL DEFAULT nextval('id_seq'),

username varchar(50), 

mobile_no      int(10)    PRIMARY KEY,  --users mobile number

phoneno        int(8),  --user's phone number

email_add       varchar(20),

aadhar         int(8),   --approx net worth

time_recorded           timestamp  --time when it was entered in the database

);

 

ð  Maybe best to make all fields other than date as varchar?

ð  Make mobile_no first field

ð  Phoneno -> Should we leave that out and only have mobile_no (since I guess everyone has one now!)

ð  email_add -> email_addr

ð  aadhar -> aadhaar (make this field optional)

ALTER SEQUENCE id_seq

owned BY user_profile.mobile_no;

 

CREATE TABLE investment_goal(

date_start      date,  -- starting date of the investment  (MDY format)

date_end        date,  --ending date of the investment  (MDY format)

mobile_no       int(10)    PRIMARY KEY,  --users mobile number

time_recorded           timestamp,  --time when it was entered in the database

time_period             timestamp  --time period of the investment only years

 

)INHERITS (goals);

ð  investment_goal -> investment_goals

ð  Is Inherits (goals) required?

ð  mobile_no (probably should be the first field in all tables)

ð  date_start -> goals are not linked to investments and so this can be left out

ð  date_end -> goal_planned_date

ð  time_period -> maybe this can be left out in case we are going to get the user to directly give the goal_planned_date

 

CREATE TABLE goals(

typegoals            varchar(50) --types of asset investment

);

 

ð  Probably should have a sequence id field?

ð  goals -> goals_master