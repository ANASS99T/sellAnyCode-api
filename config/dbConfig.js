module.exports = {
    HOST: process.env.HOST || 'localhost',
    USER: process.env.USER || 'root',
    PASSWORd: process.env.PWD || '',
    DB: process.env.DATABASE ||'sellanycode',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idel: 10000
    }

    
}