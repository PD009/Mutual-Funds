DROP DATABASE IF EXISTS info;
CREATE DATABASE info;

\c info;

CREATE SEQUENCE id_seq;
 
CREATE TABLE investment_profile(
mobile_no       int(10)    PRIMARY KEY,  --users mobile number
)INHERITS (assets),
INHERITS(liabilities);

CREATE TABLE assets (
rate_of_interest         float(2),  --in percentage
amount                  int(50),   --approx net worth
date_invest             date,  --date of the investment (MDY format)
date_maturity           date,  --date of the investment maturity (MDY format)
time_period             time  --time period of the investment only years
)INHERITS (type_asset);

CREATE TABLE type_asset(
typeasset            varchar(50), --types of asset investment
);


CREATE TABLE liabilities (
rate_of_interest     float,  --in percentage
amount              int(50),   --approx net worth
date_loan           date,  --date of the liability  (MDY format)
date_end           date,  --date of the liability ends  (MDY format)
time_period         time  --time period of the investment only years
)INHERITS (type_liability);

CREATE TABLE type_liability(
typeliability            varchar(50) --types of asset investment
);

CREATE TABLE user_profile(
user_id integer NOT NULL DEFAULT nextval('id_seq'),
username varchar(50),  
mobile_no      int(10)    PRIMARY KEY,  --users mobile number
phoneno        int(8),  --user's phone number
email_add       varchar(20),
aadhar         int(8),   --approx net worth
time_recorded           timestamp  --time when it was entered in the database
);

ALTER SEQUENCE id_seq
owned BY user_profile.mobile_no;

CREATE TABLE investment_goal(
date_start      date,  -- starting date of the investment  (MDY format)
date_end        date,  --ending date of the investment  (MDY format)
mobile_no       int(10)    PRIMARY KEY,  --users mobile number
time_recorded           timestamp,  --time when it was entered in the database
time_period             time  --time period of the investment only years

)INHERITS (goals);

CREATE TABLE goals(
typegoals            varchar(50) --types of asset investment
);

