const winston = require('winston');
const format = winston.format.printf(({ timestamp, level, message }) => {
	return `${timestamp} - ${level}: ${message}`;
  });
  const infoAndWarnFilter = winston.format((info, opts) => {
    return info.level === "info" || info.level === "warn" ? info : false;
  });
// Configuration fichiers de destination les logs
const logger = winston.createLogger({
    level: 'info', 
	format: winston.format.combine(
		winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
		format
	  ), 
    transports: [
        new winston.transports.Console(), 
        new winston.transports.File({ filename: './logs/infos.log', level: 'info',  format: winston.format.combine(infoAndWarnFilter()), filter: (log) => log.level === 'info' }),
        new winston.transports.File({ filename: './logs/errors.log', level: 'error' })
    ]
});

module.exports =logger