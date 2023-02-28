const express = require("express");
const router = express.Router();

let facebookLogin = require("./logins/facebook");
const AuthResponse = require("./models").AuthResponse;

router.post("/", async (req, res) => {
    // Set the response type to JSON
    res.setHeader("Content-Type", "application/json");

    // Decrypt the request body using AESDecryptor with the provided key and iv
    const authType = req.body.authType;

    // authentication implementations
    let result = null;
    switch (authType) {
        case "facebook":
            const appId = req.body.appId;
            const token = req.body.token;

            // Verify the app_id and token with confirm_fb_login and get the result
            result = await facebookLogin(process.env.APP_SECRET, appId, token);
            break;
        default:
            res.status(400).send(`bad auth type: ${authType}`);
            return;
    }

    if (result == null) {
        res.status(400).send("empty login result");
        return;
    }

    // If the result is valid, generate and return a PublisherResponse object
    if (result.isValid) {
        const loginResponse = new AuthResponse(
            "valid",
            "<PLAYER PROFILE IMAGE>",
            result.user_id,
            "<PLAYER NAME>",
            ["Segment1", "Segment2"],
            [
                {
                    currency: "diamonds",
                    balance: 456,
                },
                {
                    currency: "stones",
                    balance: 6,
                },
            ]
        );

        const jsonResponse = JSON.stringify(loginResponse);

        res.send(jsonResponse);
    } else {
        // If the result is invalid, halt with a 400 error
        res.status(400).send("login failed");
    }
});

module.exports = router;
