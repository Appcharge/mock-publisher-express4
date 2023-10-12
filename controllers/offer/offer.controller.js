const express = require("express");
const offerService = require("./service").init(process.env.ASSET_UPLOAD_GATEWAY_URL);
const router = express.Router();

router.post("/", async (req, res) => {
    const createOfferResponse = await offerService.createOffer()
    return res.json(createOfferResponse);
});

router.put("/", async (req, res) => {
    const updateOfferResponse = await offerService.updateOffer()
    return res.json(updateOfferResponse);
});

module.exports = router;

