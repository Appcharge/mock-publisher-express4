// Load environment variables
require("dotenv").config();

// Check if required environment variables are defined
if (
  process.env.KEY == undefined ||
  process.env.FACEBOOK_APP_SECRET == undefined ||
  process.env.APPLE_SECRET_API == undefined
) {
  console.error("Missing KEY/FACEBOOK_APP_SECRET/APPLE_SECRET_API environment variable");
  return;
}

// Load required modules
var express = require("express");
var bodyParser = require("body-parser");
const authController = require('./controllers/auth/auth.controller')
const playerController = require('./controllers/player/player.controller')
const decryptor = require("./decryptor.service").init(process.env.IV, process.env.KEY);
const signer = require('./signer.service').init(process.env.KEY);
const parseSignature = require('./utils');

// Create Express app instance
const app = express();

// Set up middleware to parse request body as text
app.use(bodyParser.text());

// Middleware to handle errors
app.use((error, req, res, next) => {
  console.error("Error: ", error);
  res.status(400).send("Bad Request");
});

app.use(express.json());

// Middleware to decrypt request body
function authMiddleware(req, res, next) {
  var expectedSignature = parseSignature(req.headers['signature']);
  var payloadToSign = `${expectedSignature.t}.${JSON.stringify(req.body)}`
  var sign = signer.signPayload(payloadToSign);
  if (sign !== expectedSignature.v1) {
    return res.status(400).json({ error: 'Invalid authorization header' });
  }
  next();
}


// Set up routes
app.use("/auth", authMiddleware)
app.use("/auth", authController)

app.use("/updateBalance", authMiddleware)
app.use("/updateBalance", playerController)

const PORT = process.env.PORT || 8080;
// Start the server
app.listen(PORT, () => console.log(`Webhook server started on port ${PORT}!`));
