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

module.exports = function() {
  return orderDAO
}
