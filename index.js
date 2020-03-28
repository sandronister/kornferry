// eslint-disable-next-line one-var
const app = require('./config'),
  port = process.env.SRV_PORT || 5000

app.listen(port, _ => {
  console.log('Rodando na porta %d', port)
})
