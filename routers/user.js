const { check, validationResult } = require('express-validator')
const sha1 = require('sha1')

module.exports = app => {
  const auth = require('../services/auth')(app)

  app.post(
    '/user',
    auth.authenticate(),
    [
      check('nome')
        .isLength(5)
        .withMessage('Nome inválido'),
      check('cpf')
        .isLength(11)
        .withMessage('Número de CPF inválido'),
      check('email')
        .isEmail()
        .withMessage('Informe um e-mail válido'),
      check('senha')
        .isLength(8)
        .withMessage('Informe uma senha com pelo menos 8 Digitos')
    ],
    (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      let user = req.body
      user.senha = sha1(user.senha)

      const db = app.persistence.connection
      const userDAO = new app.persistence.userDAO(db)

      if (userDAO.has(user)) {
        res.status(403).send({ message: 'CPF ou e-mail já cadastrado' })
        return
      }

      userDAO.insert(user)
      res.status(200).send({ message: 'sucess' })
    }
  )

  app.post('/login', (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    let user = req.body
    user.senha = sha1(user.senha)

    const db = app.persistence.connection
    const userDAO = new app.persistence.userDAO(db)
    const tokenSVC = new app.services.token(app)

    if (!userDAO.login(user)) {
      res.status(403).send({ message: 'Login inválido' })
      return
    }

    const token = tokenSVC.create(user)

    res.status(200).send({ token })
  })
}
