const axios = require("axios");
const fs = require("fs");
const path = require("path");

class PlayerService {

    constructor(apiUrl) {
        this.playerDataSetPath = path.resolve(path.resolve(
                __dirname, '../..'),
            process.env.PLAYER_DATASET_FILE_PATH
        );
        this.awardPublisherUrl = apiUrl
    }

    async infoSync() {
        const playerInfoDataset = JSON.parse(fs.readFileSync(this.playerDataSetPath, {encoding: "utf-8"}));
        console.log(playerInfoDataset)
        return playerInfoDataset["player"]
    }

    async updateBalance(signature, requestBody) {
        console.log(requestBody)
        const response = await axios.post(
            this.awardPublisherUrl,
            requestBody,
            {
                headers: {
                    "signature": signature,
                    "x-publisher-token": process.env.PUBLISHER_TOKEN
                }
            }
        )
        return response.data
    }

    static init() {
        return new PlayerService()
    }
}

module.exports = PlayerService;

