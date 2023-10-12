const axios = require("axios");

class OrderService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    async getOrders(requestBody, signature, publisherToken) {
        const response = await axios.post(
            this.apiUrl + "/reporting/reports/orders",
            requestBody,
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
        return new OrderService(apiUrl)
    }
}

module.exports = OrderService

