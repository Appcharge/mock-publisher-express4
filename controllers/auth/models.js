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