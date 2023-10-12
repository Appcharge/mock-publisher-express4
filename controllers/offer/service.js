const axios = require("axios");
const fs = require("fs");
const path = require("path");

class OfferService {
    constructor(apiUrl) {
        this.offerUrl = `${apiUrl}/offering/offer/`;
        this.offersFilePath = path.resolve(path.resolve(
                __dirname, '../..'),
            process.env.OFFERS_FILE_PATH
        );
        this.playerDatasetFilePath = path.resolve(path.resolve(
                __dirname, '../..'),
            process.env.PLAYER_DATASET_FILE_PATH
        );
        this.signatureService = require('../../signer.service').init(process.env.KEY);
    }

    async createOffer() {
        try {
            const offerDataset = JSON.parse(fs.readFileSync(this.offersFilePath, {encoding: "utf-8"}));
            const response = await axios.post(
                this.offerUrl,
                offerDataset["create"],
                {
                    headers: {
                        "x-publisher-token": process.env.PUBLISHER_TOKEN,
                        "signature": this.signatureService.createSignature(offerDataset["create"])
                    }
                }
            );
            const responseBody = response.data;
            await this.updateOfferId();

            return responseBody;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else {
                console.error(error);
                return {error: "Internal Server Error"};
            }
        }
    }

    async updateOffer(publisherToken) {
        try {
            const updateOfferDataset = JSON.parse(fs.readFileSync(this.offersFilePath, {encoding: "utf-8"}))["update"];
            const offerId = updateOfferDataset["publisherOfferId"];
            const modifiedOfferDataset = this.removeFields(updateOfferDataset, ["publisherOfferId", "createdBy", "intervals"]);
            const response = await axios.put(
                this.offerUrl + offerId,
                modifiedOfferDataset,
                {
                    headers: {
                        "x-publisher-token": process.env.PUBLISHER_TOKEN,
                        "signature": this.signatureService.createSignature(modifiedOfferDataset)
                    }
                }
            );

            const responseBody = response.data;

            return {body: responseBody, status: response.status};
        } catch (error) {
            console.error(error);
            return {error: "Internal Server Error"};
        }
    }

    removeFields(jsonNode, fieldNames) {
        const modifiedJsonNode = {...jsonNode};
        fieldNames.forEach((fieldName) => delete modifiedJsonNode[fieldName]);
        return modifiedJsonNode;
    }

    async updateOfferId() {
        const offerDataset = JSON.parse(fs.readFileSync(path.resolve(path.resolve(
                __dirname, '../..'),
            this.offersFilePath
        ), {encoding: "utf-8"}))
        const originalOfferId = offerDataset["create"]["publisherOfferId"];
        offerDataset["create"]["publisherOfferId"] = originalOfferId + "1";
        fs.writeFileSync(this.offersFilePath, JSON.stringify(offerDataset, null, 2));
    }

    static init(apiUrl, publisherToken) {
        return new OfferService(apiUrl, publisherToken)
    }
}

module.exports = OfferService;

