const axios = require("axios");
const LoginResponse = require('../models').LoginResponse

async function facebookLogin(appSecret, appId, token) {
    const response = await axios.get(
        `https://graph.facebook.com/debug_token?input_token=${
            token
        }&access_token=${appId}|${appSecret}`
    );

    if(response.status == 200) {
        const isValid = response.data.data.is_valid
        const userId = response.data.data.user_id

        return new LoginResponse(isValid, userId)
    } else {
        return new LoginResponse(false, 0)
    }
}



module.exports = facebookLogin