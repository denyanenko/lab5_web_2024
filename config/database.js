const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('stolencarsdb', 'root', 'Admin', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false, 
    },
    logging: false, // Вимкнути виведення запитів у консоль
});

module.exports = sequelize;
