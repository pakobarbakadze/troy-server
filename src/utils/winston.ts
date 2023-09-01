import winston from "winston";

const logFormat = winston.format.printf((info) => {
  const formattedTimestamp = info.timestamp.slice(0, 19).replace("T", " ");
  const circle = winston.format.colorize().colorize(info.level, "●");
  const logLevel = winston.format
    .colorize()
    .colorize(info.level, info.level.toUpperCase());
  return `${formattedTimestamp} - ${circle} ${logLevel}: ${info.message}`;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(logFormat),
    })
  );
}

export default logger;
