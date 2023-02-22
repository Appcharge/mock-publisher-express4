const crypto = require("crypto");
class DecryptorService {

    constructor(iv, key) {
        this.iv = iv
        this.key = key
    }

    decrypt(encryptedText) {
        
        const decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            this.key,
            this.iv
        );

        let decrypted = decipher.update(encryptedText, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }

}
  
 
module.exports = DecryptorService