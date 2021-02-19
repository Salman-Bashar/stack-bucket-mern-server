const morgan = require("morgan")
const rfs = require("rotating-file-stream")
const fs = require("fs")
const path = require("path")

module.exports = function (app) {
  //Format
  const format = process.env.NODE_ENV === "production" ? "combined" : "dev"

  //Create a Write Stream for Status Code < 400 (in Append Mode)
  const accessLogStream200 = rfs.createStream("access200.log", {
    path: path.join(__dirname, "../../", "logs"),
    interval: "1d",
    size: "20MB",
  })

  //Create a Write Stream for Status Code >= 400 (in Append Mode)
  const accessLogStream400 = rfs.createStream("access400.log", {
    path: path.join(__dirname, "../../", "logs"),
    interval: "1d",
    size: "20MB",
  })

  //Status Code 200 & 300
  app.use(
    morgan(format, {
      skip: (req, res) => res.statusCode >= 400,
      stream:
        process.env.NODE_ENV === "production"
          ? accessLogStream200
          : process.stdout,
    })
  )

  //Status Code 400 & 500
  app.use(
    morgan(format, {
      skip: (req, res) => res.statusCode < 400,
      stream:
        process.env.NODE_ENV === "production"
          ? accessLogStream400
          : process.stderr,
    })
  )
}
