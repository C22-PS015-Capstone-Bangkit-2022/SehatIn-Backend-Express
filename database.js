const { Client } = require('pg');

const client = new Client({
    host : "localhost",
    port : 5432,
    user : "postgres",
    password : "",
    database : "capstone"
})

client.connect();

module.exports = client;