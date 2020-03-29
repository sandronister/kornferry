const jwt = require('jwt-simple')
const cfg = require('../jwt')

function token(app) {
  this._dataSVC = new app.services.data(app)
}

token.prototype.create = function(user) {
  return jwt.encode(
    { user, exp: Math.floor(new Date().getTime()) + 7 * 24 * 60 * 60 * 100 },
    cfg.jwtSecret
  )
}

module.exports = function() {
  return token
}
