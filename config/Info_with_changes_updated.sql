DROP DATABASE IF EXISTS info;
CREATE DATABASE info;

\c info;

--CREATE SEQUENCE id_seq1;
--CREATE SEQUENCE id_seq2;
CREATE SEQUENCE id_seq3;
CREATE SEQUENCE id_seq4;

 
/*CREATE TABLE investment_profile(
mobile_no       int(10)    PRIMARY KEY,  --users mobile number
)INHERITS (assets),
INHERITS(liabilities);*/

--CREATE SEQUENCE id_seq1;

CREATE TABLE investment_profile_assets (
mobile_no      bigint,  --users mobile number
--user_id integer NOT NULL DEFAULT nextval('id_seq1'),
interest_rate         float(2),  --in percentage
amount                  bigint,   --approx net worth
asset_investment_date            date,  --date of the investment (MDY format)
asset_maturity_date          date,  --date of the investment maturity (MDY format)
typeasset            varchar(50), --types of asset investment
time_period             varchar(50),  --time period of the investment only years,months
time_recorded           timestamp  --time when it was entered in the database
);

/*ALTER SEQUENCE id_seq1
owned BY investment_profile_assets.mobile_no;*/

CREATE TABLE assets_types_master(
typeasset            varchar(50) --types of asset investment
);


CREATE TABLE investment_profile_liabilities (
mobile_no       bigint,  --users mobile number
--user_id integer NOT NULL DEFAULT nextval('id_seq2'),
interest_rate     float(2),  --in percentage
amount              bigint,   --approx net worth
liability_investment_date date,  --date of the liability  (YMD format)
liability_maturity_date           date,  --date of the liability ends  (MDY format)
typeliability            varchar(50), --types of asset investment
time_period         varchar(50),  --time period of the investment only years,months
time_recorded           timestamp  --time when it was entered in the database
);

/*ALTER SEQUENCE id_seq2
owned BY investment_profile_liabilities.mobile_no;*/

CREATE TABLE liabilities_types_master(
typeliability            varchar(50) --types of asset investment
);

CREATE TABLE user_profile(
mobile_no      bigint    PRIMARY KEY,  --users mobile number
user_id integer NOT NULL DEFAULT nextval('id_seq3'),
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
mobile_no       bigint   PRIMARY KEY,  --users mobile number
user_id integer NOT NULL DEFAULT nextval('id_seq4'),
goal_planned_date        date,  --ending date of the investment  (MDY format)
typegoals            varchar(50),--types of asset investment
time_recorded           timestamp,  --time when it was entered in the database
--time_period             timestamp  --time period of the investment only years

);

ALTER SEQUENCE id_seq4
owned BY user_profile.mobile_no;

CREATE TABLE goals_master(
typegoals            varchar(50) --types of asset investment
);

