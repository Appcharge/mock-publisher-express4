const express = require("express");
const router = express.Router();

const UpdateBalanceRequest = require('./models').UpdateBalanceRequest

router.post("/", (req, res) => {
    const updateBalaceRequest = UpdateBalanceRequest.fromJson(req.body)

    // TODO
    // Here goes your piece of code that is responsible for handling player update balance requests coming from appcharge systems
    
    return res.json({
        // TODO change the <PURCHASE-ID> with a real purchase ID
        publisherPurchaseId: "<PURCHASE-ID>",
    });
});

module.exports = router;