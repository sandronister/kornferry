const { check, validationResult } = require('express-validator')
const sha1 = require('sha1')

module.exports = app => {
  const auth = require('../services/auth')(app)

  app.post(
    '/order',
    auth.authenticate(),
    [
      check('codigo')
        .isLength(5)
        .withMessage('Você deve informar um codigo'),
      check('valor')
        .isLength(3)
        .withMessage('Você deve informar o valor'),
      check('data')
        .isLength(10)
        .withMessage('Você deve informar a data'),
      check('cpf')
        .isLength(11)
        .withMessage('Você deve informar o CPF')
    ],
    (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      let order = req.body

      const db = app.persistence.connection
      const orderDAO = new app.persistence.orderDAO(db)
      const userDAO = new app.persistence.userDAO(db)

      userDAO.setStatusOrder(order)

      if (order.status == 'invalido') {
        res.status(403).send({ message: 'CPF inválido' })
        return
      }

      order.valor = order.valor.toFixed(2)
      orderDAO.insert(order)
      res.status(200).send({ message: 'sucess' })
    }
  )
}