const Joi = require('joi');

const GetOrdersRequestSchema = Joi.object({
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
        recordLimit: Joi.number().required(),
        offset: Joi.number().required(),
        statuses: Joi.array().required(),
    }
)

module.exports = GetOrdersRequestSchema;

