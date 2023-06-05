class Signature {
  constructor(t, v1) {
    this.t = t;
    this.v1 = v1;
  }
}

function parseSignature(signatureString) {
  const regex = /t=(.*),v1=(.*)/;
  const match = signatureString.match(regex);

  if (!match || match.length < 3) {
    throw new Error('Invalid signature format');
  }

  const t = match[1];
  const v1 = match[2];

  return new Signature(t, v1);
}

module.exports = parseSignature;
