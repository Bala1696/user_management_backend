require('dotenv').config()

const { app } = require('./app')
const { connectAndSync } = require('./db/sequelize')

const PORT = Number(process.env.PORT || 4000)

async function start() {
  await connectAndSync()

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

