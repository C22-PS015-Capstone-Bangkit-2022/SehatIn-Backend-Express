// const { Client } = require('pg');

// const client = new Client({
//     HOST : "localhost",
//     port : 5432,
//     USER : "postgres",
//     PASSWORD : "postgresdinda",
//     DB : "capstone",
//     dialect: "postgres",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// })

// client.connect();

// module.exports = client;
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgresdinda",
    DB: "capstone",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };