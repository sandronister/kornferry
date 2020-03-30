function orderDAO(db) {
  this.db = db
}

orderDAO.prototype.insert = function(order) {
  let orders = this.db.get('orders')

  if (!orders) {
    orders = []
  }

  let id = orders.length
  order.id = id + 1

  orders.push(order)
  this.db.set('orders', orders)
}

orderDAO.prototype.list = function(user) {
  const orders = this.db.get('orders')
  const list = orders.map(item => {
    return {
      codigo: item.codigo,
      data: item.data,
      valor: item.valor,
      percentual: item.percentual
    }
  })
  if (!user) {
    return list
  }

  return list.filter(item => item.cpf == user.cpf)
}

module.exports = function() {
  return orderDAO
}
