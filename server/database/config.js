import dotenv from 'dotenv';
dotenv.config();

const db_conf = {
    HOST:     'localhost',
    PORT:     5432,
    USER:     'postgres',
    PASSWORD: process.env.DB_PASSWORD,
    DB:       'iot_database',
    DIALECT:  'postgres'
};

export default db_conf;
