// Load environment variables
require("dotenv").config();

// Check if required environment variables are defined
if (
  process.env.IV == undefined ||
  process.env.KEY == undefined ||
  process.env.FACEBOOK_APP_SECRET == undefined
) {
  console.error("Missing IV/KEY/FACEBOOK_APP_SECRET environment variable");
  return;
}

// Load required modules
var express = require("express");
var bodyParser = require("body-parser");
const authController = require('./controllers/auth/auth.controller')
const playerController = require('./controllers/player/player.controller')
const decryptor = require("./decryptor.service").init(process.env.IV, process.env.KEY);
const signer = require('./signer.service').init(process.env.KEY);

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
  if (req.headers.hasOwnProperty('authorization')) {
    var sign = signer.signPayload(JSON.stringify(req.body));
    if (`Signature ${sign}` !== req.headers['authorization']) {
      return res.status(400).json({ error: 'Invalid authorization header' });
    }
  } else {
    try {
      var decrypted = decryptor.decrypt(req.body);
      req.body = JSON.parse(decrypted);
    } catch (error) {
      return res.status(400).json({ error: 'Decryption failed' });
    }
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