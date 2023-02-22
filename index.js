require('dotenv').config()

if(process.env.IV == undefined || process.env.KEY == undefined) {
  console.error("Missing IV/KEY/PORT environment variable")
  return;
}

var express = require('express')
var bodyParser = require('body-parser');
const decryptorService = require('./decryptorService')

const app = express();
app.use(bodyParser.text());

const decryptor = new decryptorService(process.env.IV, process.env.KEY)

app.post('/updateBalance', (req, res) => {
    var decrypted = decryptor.decrypt(req.body)

    console.log(decrypted)

    // TODO
    // Here goes your piece of code that is responsible for handling player update balance requests coming from appcharge systems

    return res.json({
        // TODO change the <PURCHASE-ID> with a real purchase ID
        publisherPurchaseId: "<PURCHASE-ID>"
    })
})

app.use((error, req, res, next) => {
  console.error('Error: ', error)
  res.status(400).send('Bad Request')
})

app.listen(8080, () =>
  console.log(`Webhook server started!`),
);