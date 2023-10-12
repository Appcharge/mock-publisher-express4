class CreateOfferRequest {
    constructor(data) {
        this.createdBy = data.createdBy;
        this.publisherOfferId = data.publisherOfferId;
        this.name = data.name;
        this.description = data.description || '';
        this.type = data.type;
        this.intervals = data.intervals;
        this.offerUiId = data.offerUiId;
        this.dynamicOfferUi = {
            badges: data.dynamicOfferUi.badges,
            salePercentage: data.dynamicOfferUi.salePercentage || null,
        };
        this.active = data.active;
        this.coolDownInHours = data.coolDownInHours || null;
        this.segments = data.segments;
        this.productsSequence = data.productsSequence;
    }

    static fromJson(data) {
        return new CreateOfferRequest(data);
    }
}

module.exports.CreateOfferRequest = CreateOfferRequest;

