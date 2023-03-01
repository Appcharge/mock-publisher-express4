const express = require("express");
const router = express.Router();

const UpdateBalanceRequest = require('./models').UpdateBalanceRequest

router.post("/", (req, res) => {
    const updateBalaceRequest = UpdateBalanceRequest.fromJson(req.body)
    console.log("purchase request: " + JSON.stringify(updateBalaceRequest))
    /******************************
    TODO
    This controller is triggered when a player has purchased a bundle in the store.
    You need to implement the code that updates the player's balance according to the integration guideline.
    /******************************/
    
    return res.json({
        // TODO change the <PURCHASE-ID> with a real purchase ID.
        // See integration guideline
        publisherPurchaseId: "<PURCHASE-ID>",
    });
});

module.exports = router;