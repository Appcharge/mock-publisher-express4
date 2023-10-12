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

    createSignature(body) {
        const time = new Date().getTime();
        const signedPayload = `${time}.${JSON.stringify(body)}`;
        const signature = crypto.createHmac('sha256', this.key)
            .update(signedPayload)
            .digest('hex');
        return `t=${time},v1=${signature}`;
    }

    static init(key) {
        return new SignatureHashingService(key)
    }

}

module.exports = SignatureHashingService

