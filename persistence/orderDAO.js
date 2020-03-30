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

orderDAO.prototype.select = function(orders){
  return orders.map(item => {
    return {
      codigo: item.codigo,
      data: item.data,
      valor: item.valor,
      percentual: item.percentual
    }
  })
}

orderDAO.prototype.list = function(user) {
  const orders = this.db.get('orders')

  if (!user) {
    return this.select(orders)
  }

  const list = orders.filter(item => {
    return item.cpf == user.cpf
  })

  return this.select(list)
}

module.exports = function() {
  return orderDAO
}
