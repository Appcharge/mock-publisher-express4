const parseSignature = require('../utils');

const signer = require('../signer.service').init(process.env.KEY);

function authMiddleware(req, res, next) {
    var expectedSignature = parseSignature(req.headers['signature']);
    var payloadToSign = `${expectedSignature.t}.${JSON.stringify(req.body)}`
    var sign = signer.signPayload(payloadToSign);
    if (sign !== expectedSignature.v1) {
        return res.status(401).json({error: 'Invalid authorization header'});
    }
    next();
}

module.exports = authMiddleware;

