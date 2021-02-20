require("dotenv").config()
const path = require("path")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { useMorgan } = require("./middlewares")
const { logger } = require("./utils")

const app = express()

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Database connected successfully...")
  })
  .catch((e) => {
    logger.error(e.message)
  })

useMorgan(app)
app.use(cors())
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

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`)
})
