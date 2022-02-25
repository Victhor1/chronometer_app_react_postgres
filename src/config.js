const { config } = require('dotenv');
config()

// module.exports = {
//     db: {
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         database: process.env.DB_DATABASE
//     }
// }

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_DATABASE,
    DIALECT: process.env.DB_DIALECT,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}