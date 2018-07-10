const promise = require('bluebird');

// Proper way to initialize and share the Database object
const options = {
  // Initialization Options
  promiseLib: promise,
// global event notification;
    error: (error, e) => {
        if (e.cn) {
            // A connection-related error;
            //
            // Connections are reported back with the password hashed,
            // for safe errors logging, without exposing passwords.
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
        }
    }  
};

// Loading and initializing the library:
const pgp = require('pg-promise')(options);
// Preparing the connection details:
const cn = {
    host: 'ec2-54-83-59-239.compute-1.amazonaws.com',
    // host: 'postgres://karfbvsappvblx:b283af7c191ee47bcad832397a67147ac97f84677ac4172bf00d7e1935c23302@ec2-107-20-133-82.compute-1.amazonaws.com:5432/d4uk4guv9810pl',
    // host: 'localhost',    //server name or IP addres
    port: 5432,           //server port number
    database: 'd39d5g00p3b6rl',
    // database: 'foodorder',       //database name
    user: 'bmqhorwmvhpywm',     //user name
    // user: 'postgres',     //user name
    password: '0fb68e9caa2eb4daf53687fab1ff378d9d1d5b04fefd30b66753f825fa6bb702', //user password
    // password: 'password', //user password
    ssl: false           //use SSL
    // poolSize: 10,         //maximum size of the connection pool
    // poolIdleTimeout:      //lifespan for unused connections
};


const db = pgp(cn); // database instance;

// // alternative:
// const connectionString = 'postgres://postgres:password@localhost:5432/fc'; //postgresql://userName:password@host:port/database
// // Creating a new database instance from the connection details:
// const db = pgp(connectionString);



// db.connect()
//     .then(obj => {
//         obj.done(); // success, release the connection;
//     })
//     .catch(error => {
//         console.log('ERROR:', error.message || error);
//     });



// Exporting the database object for shared use:
module.exports = db;
