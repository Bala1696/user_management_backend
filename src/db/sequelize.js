const { Sequelize, DataTypes } = require('sequelize')

const initRecordModel = require('../models/Record')

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy backend/.env.example to backend/.env and fill it.`,
    )
  }
  return value
}

const sequelize = new Sequelize(
  requiredEnv('DB_NAME'),
  requiredEnv('DB_USER'),
  requiredEnv('DB_PASSWORD'),
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    dialectOptions: {
      decimalNumbers: true,
    },
  },
)

const Record = initRecordModel(sequelize, DataTypes)

async function connectAndSync() {
  await sequelize.authenticate()

  if (process.env.DB_SYNC === 'true') {
    await sequelize.sync({
      alter: process.env.DB_SYNC_ALTER === 'true',
    })
  }
}

module.exports = {
  sequelize,
  Record,
  connectAndSync,
}

