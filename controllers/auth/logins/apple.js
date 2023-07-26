const axios = require("axios");
const { LoginResponse } = require("../models");

const appleLogin = async (appId, token, appleSecretApi) => {
  if (!appleSecretApi) {
    console.log('Apple secret API is not provided.');
    return new LoginResponse(false, null);
  }

  const url = 'https://appleid.apple.com/auth/token';

  const requestBody = `client_id=${appId}&client_secret=${appleSecretApi}&code=${token}&grant_type=authorization_code`;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: requestBody,
  };

  try {
    const response = await axios.post(url, requestBody, requestOptions);
    const data = response.data;

    const accessToken = data.access_token;
    const idToken = data.id_token;

    const userId = extractUserIdFromIdToken(idToken);

    return new LoginResponse(true, userId);
  } catch (error) {
    console.error(error);
    return new LoginResponse(false, null);
  }
};

function extractUserIdFromIdToken(idToken) {
  const parts = idToken.split('.');
  if (parts.length !== 3) {
    return null; // Invalid ID token format
  }

  const encodedPayload = parts[1];
  const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
  const payloadJson = decodedPayload;

  try {
    const payload = JSON.parse(payloadJson);
    const userId = payload.sub;
    return userId;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = appleLogin;
