function userDAO(db){
  this.db = db
}

userDAO.prototype.insert = function(user){
    let listUsers = this.db.get('users')

    if(!listUsers){
      listUsers = []
    }
    
    let id = listUsers.length
    user.id = (id+1)
    
    listUsers.push(user)
    this.db.set('users',listUsers)
}


module.exports = function () {
  return userDAO
}