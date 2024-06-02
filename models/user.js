const { sq } = require('../lib/db');
const { DataTypes } = require('sequelize');

const User = sq.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// User.sync().then((res) => {
//     console.log('User table sync.');
// });

module.exports = User;
