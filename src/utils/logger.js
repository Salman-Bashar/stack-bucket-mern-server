const { Logger, createLogger, format, transports } = require("winston")

const level = process.env.LOG_Level || "debug"

function formatParams(info) {
  const { timestamp, level, message, ...args } = info
  const ts = timestamp.slice(0, 19).replace("T", " ")

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, "") : ""
  }`
}

//Development Format
const devFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
)

//Production Format
const prodFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
)

let logger = null

if (process.env.NODE_ENV === "production") {
  logger = createLogger({
    level,
    format: prodFormat,
    transports: [
      new transports.file({ filename: "logs/error.log", level: "error" }),
      new transports.file({ filename: "logs/combined.log" }),
    ],
  })
} else {
  logger = createLogger({
    level,
    format: devFormat,
    transports: [new transports.Console()],
  })
}

module.exports = logger
