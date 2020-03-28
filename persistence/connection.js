const JSONdb = require('simple-json-db');
 
const db = new JSONdb('./database/db.json')

module.exports = db
