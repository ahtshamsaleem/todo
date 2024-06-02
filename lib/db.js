const { Sequelize } = require("sequelize");
import * as pg from 'pg'


const sequelize = new Sequelize( process.env.DB_URI , {
    dialect: 'postgres',
    dialectModule: pg
});

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };


module.exports = { sq: sequelize, testDbConnection };
