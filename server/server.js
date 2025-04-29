import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import { createServer } from 'http'
import userRouter from './routes/userRoutes.js'

// App config
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())


// DB connect
await connectDB()


// Route

app.get('/', (req, res) => {
  res.send("API Working from Vercel! 🚀")
})
app.use('/api/user',userRouter)

// Export the handler
export default function handler(req, res) {
  return app(req, res)
}
