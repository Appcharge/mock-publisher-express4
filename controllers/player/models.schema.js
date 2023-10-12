const Joi = require('joi');

const ProductRequestSchema = Joi.object({
    amount: Joi.number().required(),
    sku: Joi.string().required(),
    name: Joi.string().required()
});

const UpdateBalanceRequestSchema = Joi.object({
    appChargePaymentId: Joi.string().required(),
    purchaseDateAndTimeUtc: Joi.date().iso().required(),
    gameId: Joi.string().required(),
    playerId: Joi.string().required(),
    bundleName: Joi.string().required(),
    bundleId: Joi.string().required(),
    sku: Joi.string().required(),
    priceInCents: Joi.number().required(),
    priceInDollar: Joi.number().required(),
    currency: Joi.string().required(),
    subTotal: Joi.number().required(),
    tax: Joi.number().required(),
    action: Joi.string().valid("purchase").required(),  // Adjust based on possible actions
    actionStatus: Joi.string().valid("completed").required(), // Adjust based on possible statuses
    products: Joi.array().items(ProductRequestSchema).required()
});

module.exports = UpdateBalanceRequestSchema;

