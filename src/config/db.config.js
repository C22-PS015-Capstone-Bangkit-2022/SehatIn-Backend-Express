module.exports = {
    HOST: process.env.HOST_DB || "localhost",
    USER: process.env.USER_DB||"postgres",
    PASSWORD: process.env.PASS_DB ,
    DB: process.env.DB ,
    dialect: "postgres",
    pool: {
        max:5, 
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};