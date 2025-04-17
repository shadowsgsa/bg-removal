import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'

console.log("ENV:", process.env); // check everything loaded
console.log("MONGO_URI:", process.env.MONGODB_URI); // check this specifically


// App Config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// Initialize Middlewares
app.use(express.json())
app.use(cors())

// API route
app.get('/',(req,res)=> res.send("API Working"))

app.listen(PORT, ()=> console.log("Server Running on port "+PORT))