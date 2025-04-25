import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import { createServer } from 'http'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// API route
app.get('/',(req,res)=> res.send("API Working"))

app.listen(PORT, ()=> console.log("Server Running on port "+PORT))