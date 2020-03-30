function userDAO(db) {
  this.db = db
}

userDAO.prototype.insert = function(user) {
  let listUsers = this.db.get('users')

  if (!listUsers) {
    listUsers = []
  }

  let id = listUsers.length
  user.id = id + 1

  listUsers.push(user)
  this.db.set('users', listUsers)
}

userDAO.prototype.has = function(user) {
  const listUsers = this.db.get('users')

  if (!listUsers) {
    return false
  }

  let result = listUsers.filter(item => {
    return item.email == user.email || item.cpf == user.cpf
  })

  return result.length > 0
}

userDAO.prototype.login = function(user) {
  const listUsers = this.db.get('users')

  if (!listUsers) {
    return false
  }

  let result = listUsers.filter(item => {
    return item.email == user.email && item.senha == user.senha
  })

  return result.length > 0
}

userDAO.prototype.getUser = function(user) {
  const listUsers = this.db.get('users')

  if (!listUsers) {
    return []
  }

  let result = listUsers.filter(item => {
    return item.email == user.email && item.senha == user.senha
  })

  return result
}

userDAO.prototype.getExceptions = function() {
  let listExcept = this.db.get('exceptions')

  if (!listExcept) {
    listExcept = [{ user: '15350946056' }]
    this.db.set('exceptions', listExcept)
  }

  return listExcept
}

userDAO.prototype.hasCPF = function(cpf) {
  let users = this.db.get('users')

  let result = users.filter(item => {
    return item.cpf == cpf
  })

  return result.length > 0
}

userDAO.prototype.setStatusOrder = function(order) {
  let exceptions = this.getExceptions()

  let result = exceptions.filter(item => {
    return item.user == order.cpf
  })

  order.status = result.length > 0 ? 'Aprovado' : 'Em validação'

  if (order.status == 'Aprovado') {
    return
  }

  if (!this.hasCPF(order.cpf)) {
    order.status = 'invalido'
  }
}

module.exports = function() {
  return userDAO
}
