const winston = require('winston')
const fs = require('fs')

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs')
}

module.exports = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/boticario.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
