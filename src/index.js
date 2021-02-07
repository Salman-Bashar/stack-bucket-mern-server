const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello World!",
  })
})

app.listen(8080, () => {
  console.log("Server is listening on port 8080")
})
