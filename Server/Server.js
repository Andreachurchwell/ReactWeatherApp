const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()
const bcrypt = require('bcrypt')
const port = process.env.PORT || 5000;
const Router = require("./routes/routes.js")
const cookieParser = require('cookie-parser'); // gives ability to view cookies


app.use(cookieParser())


app.use(express.json())   // Gives access to the req.body



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
    
}))

app.get("/test", (req, res) => {
    console.log("TEST route HIT!!!")
    res.json({ msg: "Hello World!" })
})




// app.post('/api/registration', (req, res) => {
//     console.log('reg hit', req.body)
//     res.json({ msg: 'reg hit!!!!for reg login submit' })
// })

Router(app)



app.listen(port, () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected to Database")
    })
    console.log(`Server is running on port: ${port} `)
})