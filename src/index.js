require("dotenv").config()
const path = require("path")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 5000

mongoose
  .connect("mongodb://localhost:27017/stack-bucket-mern", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected")
  })
  .catch((e) => {
    console.log(e)
  })

app.use(cors())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "../", "public")))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello World!",
  })
})

app.use((req, res, next) => {
  const error = new Error("404 Page Not Found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  console.log(error)

  if (error.status === 404) {
    return res.status(404).json({
      msg: "Internal Server Error",
      status: 404,
    })
  }

  return res.status(500).json({
    msg: error.message,
    status: 500,
  })
})

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT)
})
