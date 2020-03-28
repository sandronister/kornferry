module.exports = app => {
  app.post("/user", (req, res, next) => {
    const db = app.persistence.connection;
    const userDAO = new app.persistence.userDAO(db);
    console.log(req.body)
    userDAO.insert(req.body);
    res.status(200).send('ok')
  });
};
