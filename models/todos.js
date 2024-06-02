const { sq } = require('../lib/db');
const { DataTypes } = require('sequelize');

const Todo = sq.define('todo', {
    title: {
        type: DataTypes.STRING,
    },

    description: {
        type: DataTypes.STRING,
    },

    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

//   Todo.sync().then((res) => {
//     console.log('User table sync.')
//   })

module.exports = Todo;
