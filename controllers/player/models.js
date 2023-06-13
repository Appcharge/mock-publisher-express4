class ProductRequest {
    amount
    sku
    name

    static fromJson(data) {
        return Object.assign(new ProductRequest(), data);
    }
}

class Price {
    subTotal
    tax

    static fromJson(data) {
        return Object.assign(new ProductRequest(), data);
    }
}

class UpdateBalanceRequest {
    appChargePaymentId
    purchaseDateAndTimeUtc
    gameId
    playerId
    bundleName
    bundleId
    sku
    priceInCents
    priceInDollars
    currency
    price
    action
    actionStatus
    products
    publisherToken

    static fromJson(data) {
        let products = data.products
        let price = data.price
        delete data.products
        delete data.price

        let instance = Object.assign(new UpdateBalanceRequest(), data);
        instance.products = products.map(product => ProductRequest.fromJson(product));
        instance.price = Price.fromJson(Price.fromJson(price));
        
        return instance
    }
}

module.exports.UpdateBalanceRequest = UpdateBalanceRequest
