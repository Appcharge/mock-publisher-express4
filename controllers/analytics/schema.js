const Joi = require('joi');

const AnalyticsRequestSchema = Joi.object({
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
        metrics: Joi.array().required(),
        incomeType: Joi.string().required(),
    }
)

module.exports = AnalyticsRequestSchema;

