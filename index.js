// Load environment variables
require("dotenv").config();

// Check if required environment variables are defined
if (
  process.env.IV == undefined ||
  process.env.KEY == undefined ||
  process.env.APP_SECRET == undefined
) {
  console.error("Missing IV/KEY/APP_SECRET environment variable");
  return;
}

// Load required modules
var express = require("express");
var bodyParser = require("body-parser");
const authController = require('./controllers/auth/auth.controller')
const playerController = require('./controllers/player/player.controller')
const decryptor = require("./decryptor.service").init(process.env.IV, process.env.KEY);

// Create Express app instance
const app = express();

// Set up middleware to parse request body as text
app.use(bodyParser.text());

// Middleware to handle errors
app.use((error, req, res, next) => {
  console.error("Error: ", error);
  res.status(400).send("Bad Request");
});

// Middleware to decrypt request body
function decryptMiddleware(req, res, next){
  var decrypted = decryptor.decrypt(req.body);
  req.body = JSON.parse(decrypted)
  next()
}

// Set up routes
app.use("/auth", decryptMiddleware)
app.use("/auth", authController)

app.use("/updateBalance", decryptMiddleware)
app.use("/updateBalance", playerController)

// Start the server
app.listen(8080, () => console.log(`Webhook server started!`));