const express = require("express");
const signer = require('../../signer.service').init(process.env.KEY);
const analyticsService = require("./service").init(process.env.REPORTING_API_URL);
const router = express.Router();
const AnalyticsRequestSchema = require("./schema");
const {AnalyticsRequest} = require("./models");
const secretsService = {
    reportingApiUrl: () => process.env.REPORTING_API_URL,
    key: () => process.env.KEY
};

router.post("/", async (req, res) => {
    const { error } = AnalyticsRequestSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ error: error.details[0].message });
    }

    const getAnalyticsRequest = AnalyticsRequest.fromJson(req.body)
    const signature = signer.createSignature(getAnalyticsRequest, secretsService.key())
    const getAnalyticsResponse = await analyticsService.getAnalytics(
        getAnalyticsRequest,
        signature,
        req.headers["x-publisher-token"],
        secretsService.reportingApiUrl()
    )
    return res.json(getAnalyticsResponse);
});

module.exports = router;

