const express = require("express")
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()

app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
    exposeHeaders: ['Access-Control-Allow-Credentials'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
app.use(cors(corsOptions))



app.use("/api",router)

const PORT = process.env.PORT || 3000


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log(`Server is runnig at PORT http://localhost:${PORT}`)
    })
})