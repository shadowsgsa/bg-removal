import 'dotenv/config'
import express from 'express'
import serverless from 'serverless-http'
import cors from 'cors'
import connectDB from './configs/mongodb.js'

const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB once (usually outside the handler)
await connectDB()

app.get('/', (req, res) => res.send("API Working"))

// Export the handler
export const handler = serverless(app)
