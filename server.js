const express = require("express")
const connectDB = require('./db'); 
const app = express()

const PORT = 8099

app.use(express.json())

app.get("/" , (req , res) => {
  console.log("im alive and running ...plug walk")
  res.send("API runnning").status(200)
})

app.listen(PORT , () => {console.log(`Server is running on port ${PORT}`)})