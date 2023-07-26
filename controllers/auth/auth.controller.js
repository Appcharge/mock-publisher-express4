const express = require("express");
const router = express.Router();

const secretsService = {
  getFacebookSecret: () => process.env.FACEBOOK_APP_SECRET,
  getAppleSecretApi: () => process.env.APPLE_SECRET_API,
};

const facebookLogin = require("./logins/facebook");
const googleLogin = require("./logins/google");
const appleLogin = require("./logins/apple");
const { LoginResponse } = require("./models");

const createAuthResponse = (authResult) => {
  return {
    status: "valid",
    imageUrl:
      "https://scontent.ftlv15-1.fna.fbcdn.net/v/t1.6435-9/39453230_281250465987441_6821580385961377792_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=EhNdfDjnT0MAX9Urj2h&_nc_ht=scontent.ftlv15-1.fna&oh=00_AfDz7cKzDCQC17o4L0i1ujpjilH11pTdfVyWPXMxzuOGxQ&oe=64C269BF",
    publisherPlayerId: authResult.userId,
    playerName: "Joe Dow",
    segments: ["seg1", "seg2"],
    balances: [{ currency: "diamonds", balance: 15 }],
  };
};

router.post("/", async (req, res) => {
  const authRequest = req.body;

  try {
    let authResult = new LoginResponse(false, null);

    const authMethod = authRequest ? authRequest.authMethod : null;
    switch (authMethod) {
      case "facebook":
        authResult = await facebookLogin(
          authRequest.appId,
          authRequest.token,
          secretsService.getFacebookSecret()
        );
        break;
      case "google":
        authResult = await googleLogin(
          authRequest.appId,
          authRequest.token
        );
        break;
      case "apple":
        authResult = await appleLogin(
          authRequest.appId,
          authRequest.token,
          secretsService.getAppleSecretApi()
        );
        break;
      case "userToken":
      case "userPassword":
        authResult = new LoginResponse(true, authRequest.token);
        break;
      default:
        console.error("Unknown authentication method", authMethod);
        return res.status(400).json(null);
    }

    if (authResult.isValid) {
      console.log("Successful login");
      const authResponse = createAuthResponse(authResult);
      return res.json(authResponse);
    } else {
      console.log("Failed login");
      return res.status(400).json(null);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json(null);
  }
});

module.exports = router;
