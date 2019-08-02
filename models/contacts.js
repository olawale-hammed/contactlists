const Sequelize = require('sequelize');
const sequelize = new Sequelize('contactlists', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5, 
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: { //change the defaults option for all defined models
        timestamps: false, // disabled createdAt and updatedAt
        freezeTableName: false // disable pluralising the table name
    }
});

// this is to model a table, contact is the database table name
const contact = sequelize.define('contacts', {
    first_name:{
        type: Sequelize.STRING,
        required: true
    },
    last_name:{
        type: Sequelize.STRING,
        required: true
    },
    phone:{
        type: Sequelize.STRING,
        required: true
    },
    pin:{
        type: Sequelize.STRING,
        required: true
    }
});

module.exports = contact;