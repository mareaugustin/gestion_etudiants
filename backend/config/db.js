require('dotenv').config();


const config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ',adgjmptw',
        database: process.env.DB_NAME || 'gestion_etudiant',
        port: process.env.DB_PORT || 3306
    },
    server: {
        port: process.env.PORT || 3000
    }
};

module.exports = config;