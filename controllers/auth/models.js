class AuthResponse {
    status;
    playerProfileImage;
    publisherPlayerId;
    playerName;
    segments;
    balances;

    constructor(status, playerProfileImage, publisherPlayerId, playerName, segments, balances) {
        this.status = status;
        this.playerProfileImage = playerProfileImage;
        this.publisherPlayerId = publisherPlayerId;
        this.playerName = playerName;
        this.segments = segments;
        this.balances = balances;
      } 
}

class AuthenticationRequest {
    authMethod
    token
    date
    appId
    userName
    password

    static fromJson(data) {
        let instance = Object.assign(new AuthenticationRequest(), data);
        instance.date = new Date(data.date);  // Converting the date string into a JavaScript Date object
        return instance;
    }
}

class LoginResponse {
    isValid;
    userId;

    constructor(isValid, userId) {
        this.isValid = isValid
        this.userId = userId
    }

}

module.exports.AuthResponse = AuthResponse
module.exports.LoginResponse = LoginResponse
module.exports.AuthenticationRequest = AuthenticationRequest

