const express = require("express");
const { default: mongoose } = require("mongoose");
const env = require('dotenv').config()
const app = express()
const router = require("./router/router")
const  bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use("/router", router)
// app.get("/", (req,res) =>{
// res.json("hej")
// })


mongoose
.connect(process.env.DATABASE_URL)
.then(()=>{console.log("connected to the database")
app.listen(5000, ()=>{console.log("running on port 5000")})
})
.catch(err=>{console.log(err.message)})

