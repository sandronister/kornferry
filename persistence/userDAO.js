function userDAO(db) {
  this.db = db;
}

userDAO.prototype.insert = function(user) {
  let listUsers = this.db.get("users");

  if (!listUsers) {
    listUsers = [];
  }

  let id = listUsers.length;
  user.id = id + 1;

  listUsers.push(user);
  this.db.set("users", listUsers);
};

userDAO.prototype.has = function(user) {
  const listUsers = this.db.get("users");

  if(!listUsers){
    return false
  }

  let result = listUsers.filter(item => {
    return item.email == user.email || item.cpf == user.cpf;
  })

  return result.length > 0
}

module.exports = function() {
  return userDAO;
}
