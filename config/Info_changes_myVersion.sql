DROP DATABASE IF EXISTS info;
CREATE DATABASE info;

\c info;

CREATE SEQUENCE id_seq1;
CREATE SEQUENCE id_seq2;
CREATE SEQUENCE id_seq3;
CREATE SEQUENCE id_seq4;

 
/*CREATE TABLE investment_profile(
mobile_no       int(10)    PRIMARY KEY,  --users mobile number
)INHERITS (assets),
INHERITS(liabilities);*/

--CREATE SEQUENCE id_seq1;

CREATE TABLE investment_profile_assets (
mobileno      integer    PRIMARY KEY,  --users mobile number
--user_id integer NOT NULL DEFAULT nextval('id_seq1'),
interest_rate         float(2),  --in percentage
amount                  integer,   --approx net worth
asset_investment_date            date,  --date of the investment (MDY format)
asset_maturity_date          date,  --date of the investment maturity (MDY format)
time_period             varchar(10),  --time period of the investment only years,months
time_recorded           timestamp  --time when it was entered in the database
);
--INHERITS (assets_types_master);

--ALTER SEQUENCE id_seq1
--owned BY investment_profile_assets.mobile_no;

/*CREATE TABLE assets_types_master(
typeasset            varchar(50) --types of asset investment
);*/


CREATE TABLE investment_profile_liabilities (
mobile_no       int(10)    PRIMARY KEY,  --users mobile number
user_id integer NOT NULL DEFAULT nextval('id_seq'),
interest_rate     float(2),  --in percentage
amount              int,   --approx net worth
liability_investment_date date,  --date of the liability  (MDY format)
liability_maturity_date           date,  --date of the liability ends  (MDY format)
time_period         timestamp,  --time period of the investment only years,months
time_recorded           timestamp  --time when it was entered in the database
)INHERITS (type_liability);

ALTER SEQUENCE id_seq2
owned BY investment_profile_liabilities.mobile_no;

CREATE TABLE liabilities_types_master(
typeliability            varchar(50) --types of asset investment
);

CREATE TABLE user_profile(
mobile_no      int    PRIMARY KEY,  --users mobile number
user_id integer NOT NULL DEFAULT nextval('id_seq2'),
username varchar(50),  
--phoneno        int(8),  --user's phone number
email_addr       varchar(20),
aadhaar         int,   --approx net worth
time_recorded           timestamp  --time when it was entered in the database
);

ALTER SEQUENCE id_seq3
owned BY user_profile.mobile_no;

CREATE TABLE investment_goal(
--date_start      date,  -- starting date of the investment  (MDY format)
mobile_no       int   PRIMARY KEY,  --users mobile number
user_id integer NOT NULL DEFAULT nextval('id_seq3'),
goal_planned_date        date,  --ending date of the investment  (MDY format)
time_recorded           timestamp,  --time when it was entered in the database
--time_period             timestamp  --time period of the investment only years

)INHERITS (goals);

ALTER SEQUENCE id_seq3
owned BY user_profile.mobile_no;

CREATE TABLE goals_master(
typegoals            varchar(50) --types of asset investment
);

