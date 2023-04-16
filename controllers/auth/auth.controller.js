const express = require("express");
const router = express.Router();

let facebookLogin = require("./logins/facebook");
const AuthResponse = require("./models").AuthResponse;

router.post("/", async (req, res) => {
    // Set the response type to JSON
    res.setHeader("Content-Type", "application/json");

    // Decrypt the request body using AESDecryptor with the provided key and iv
    const authMethod = req.body.authMethod;

    // authentication implementations
    let result = null;
    switch (authMethod) {
        case "facebook":
            const appId = req.body.appId;
            const token = req.body.token;

            // Verify the app_id and token with confirm_fb_login and get the result
            result = await facebookLogin(process.env.FACEBOOK_APP_SECRET, appId, token);
            break;
        default:
            res.status(400).send(`bad auth type: ${authMethod}`);
            return;
    }

    if (result == null) {
        res.status(400).send("empty login result");
        return;
    }

    // If the result is valid
    if (result.isValid) {

        /******************************
        TODO
        In this section the user is authenticated and verified against the SSO provider.
        `loginResponse` contains an example response for user authentication, you will need to implement this part with data from your backend.
        You will have the user id returned by the SSO verification under `result.user_id`, you should use this id to find the user in your systems.
        AuthResponse values can be found in the integration documentation.
        /******************************/
        console.log("login successful")
        const loginResponse = new AuthResponse(
            "valid",
            "<PLAYER PROFILE IMAGE>",
            "<PLAYER ID>",
            "<PLAYER NAME>",
            ["<Segment1>", "<Segment2>"],
            [
                {
                    currency: "diamonds",
                    balance: 456,
                },
                {
                    currency: "stones",
                    balance: 6
                }
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
