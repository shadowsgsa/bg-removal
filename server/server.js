import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import { createServer } from 'http'

const app = express()

// Connect to DB before starting the server
const startServer = async () => {
  try {
    await connectDB()

    // Middlewares
    app.use(express.json())
    app.use(cors())

    // API route
    app.get('/', (req, res) => res.send("API Working"))

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log("Server Running on port " + PORT))
  } catch (error) {
    console.error("Failed to start server:", error)
  }
}

startServer()
