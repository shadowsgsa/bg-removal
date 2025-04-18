import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'

const app = express()

// Immediately invoke async DB connect
(async () => {
  await connectDB()
})()

// Middlewares
app.use(express.json())
app.use(cors())

// Route
app.get('/', (req, res) => {
  res.send("API Working from Vercel! 🎉")
})

// 👇 Export the app instead of listening
export default app
