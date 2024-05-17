require("winston-daily-rotate-file");

const winston = require("winston");
const fs = require("fs");

const env = require("./env");

const logDir = "log";

let level = env === "development" ? "debug" : "info";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const colorizer = winston.format.colorize();

const myFormat = (msg) =>
  `${msg.timestamp} - [${msg.level.toUpperCase()}]: ${msg.message}`;

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf((msg) => myFormat(msg))
  ),
  transports: [
    // Does not print to console, only file write
    new winston.transports.DailyRotateFile({
      filename: `${logDir}/results-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      maxSize: "7d",
    }),
  ],
});

// Allows printing to console with pretty colors
// we don't want color escape characters in our log files
if (env !== "production") {
  logger.add(
    new winston.transports.Console({
      level,
      format: winston.format.printf((msg) =>
        colorizer.colorize(msg.level, myFormat(msg))
      ),
    })
  );
}

logger.stream = {
  write: function (message) {
    logger.info(message);
  },
};

module.exports = logger;
