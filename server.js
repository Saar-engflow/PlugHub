const express = require("express")
const connectDB = require('./db'); 
const app = express()

const PORT = 8099

connectDB()

app.get("/" , (req , res) => {
  console.log("im alive and running ...plug walk")
  res.sendStatus(200)
})

app.listen(PORT , () => {console.log(`Server is running on port ${PORT}`)})