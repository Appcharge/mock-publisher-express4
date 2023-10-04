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
const ordersController = require('./controllers/order/order.controller')
const analyticsController = require('./controllers/analytics/analytics.controller')
const offerController = require('./controllers/offer/offer.controller')
const authMiddleware = require("./middleware/auth.middleware");

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


// Set up routes
app.use("/mocker/auth", authMiddleware)
app.use("/mocker/auth", authController)

app.use("/mocker", authMiddleware)
app.use("/mocker", playerController)

app.use("/mocker/orders", authMiddleware)
app.use("/mocker/orders", ordersController)

app.use("/mocker/analytics", authMiddleware)
app.use("/mocker/analytics", analyticsController)

app.use("/mocker/analytics", authMiddleware)
app.use("/mocker/offer", offerController)

const PORT = process.env.PORT || 8080;
// Start the server
app.listen(PORT, () => console.log(`Webhook server started on port ${PORT}!`));
