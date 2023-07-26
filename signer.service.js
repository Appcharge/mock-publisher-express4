const crypto = require("crypto");

class SignatureHashingService {

    constructor(key) {
        this.key = key
    }

    signPayload(payload) {
        const hmac = crypto.createHmac('sha256', this.key);
        hmac.update(payload);
        return hmac.digest('hex');
    }

    static init(key) {
        return new SignatureHashingService(key)
    }

}

module.exports = SignatureHashingService
