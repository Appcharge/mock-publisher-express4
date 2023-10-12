const Joi = require('joi');

const CreatedBy = ['API', 'DASHBOARD'];

const OfferType = ['Bundle', 'SpecialOffer', 'OnePlusOne', 'Bonus'];

const Position = ['right', 'left', 'center'];

const CreateOfferSchema = Joi.object({
    createdBy: Joi.string().valid(...CreatedBy).required(),
    publisherOfferId: Joi.string().required(),
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).optional(),
    type: Joi.string().valid(...OfferType).required(),
    intervals: Joi.array().items(
        Joi.object({
            startDate: Joi.date().iso().required(),
            endDate: Joi.date().iso().required(),
        })
    ).required(),
    offerUiId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    dynamicOfferUi: Joi.object({
        badges: Joi.array().items(
            Joi.object({
                publisherBadgeId: Joi.string().required(),
                position: Joi.string().valid(...Position).required(),
            })
        ).required(),
        salePercentage: Joi.number().optional(),
    }).optional(),
    active: Joi.boolean().required(),
    coolDownInHours: Joi.number().min(1).optional(),
    segments: Joi.array().items(Joi.string()).required(),
    productsSequence: Joi.array().items(
        Joi.object({
            index: Joi.number().min(1).required(),
            products: Joi.array().items(
                Joi.object({
                    publisherProductId: Joi.string().required(),
                    quantity: Joi.number().min(1).required(),
                })
            ).required(),
            priceInUsdCents: Joi.number().integer().min(1).required(),
            playerAvailability: Joi.number().min(1).optional(),
        })
    ).required(),
});

module.exports = CreateOfferSchema;

