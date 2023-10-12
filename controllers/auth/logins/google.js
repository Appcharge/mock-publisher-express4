const axios = require("axios");
const { LoginResponse } = require("../models");

const googleLogin = async (appId, token) => {
  const url = `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const data = response.data;

      if (data.aud === appId) {
        return new LoginResponse(true, data.sub);
      }
    }
  } catch (error) {
    console.error(error);
  }

  return new LoginResponse(false, null);
};

module.exports = googleLogin;

