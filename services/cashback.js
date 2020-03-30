const axios = require('axios')

function cashback(app) {
  this.app = app
}

cashback.prototype.getValues = async function(cpf) {
  let result = await axios({
    method: 'get',
    url: `https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=1${cpf}`,
    headers: { 'Content-Type': 'application/json','token':'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm' }
  })

  result.data.body.credit = result.data.body.credit.toFixed(2)
  return result.data.body
}

module.exports = function() {
  return cashback
}
