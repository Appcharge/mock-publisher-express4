const axios = require("axios");

class AnalyticsService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    async getAnalytics(requestBody, signature, publisherToken) {
        const response = await axios.post(
            this.apiUrl + "/reporting/reports/analytics", requestBody,
            {
                headers: {
                    "signature": signature,
                    "x-publisher-token": publisherToken
                }
            }
        )
        return response.data
    }

    static init(apiUrl) {
        return new AnalyticsService(apiUrl)
    }
}

module.exports = AnalyticsService

