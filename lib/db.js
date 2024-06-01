const { Sequelize } = require("sequelize");
import * as pg from 'pg'


const sequelize = new Sequelize("postgres://default:tLpP4RUs7Kkw@ep-holy-dawn-a49amy6c-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require", {
    dialect: 'postgres',
    dialectModule: pg
});
// const sequelize = new Sequelize("username", 'root', 'asdasd');

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };


module.exports = { sq: sequelize, testDbConnection };
