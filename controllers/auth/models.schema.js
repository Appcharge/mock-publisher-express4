const Joi = require('joi');

const AuthenticationRequestSchema = Joi.object({
    authMethod: Joi.string().valid('facebook', 'google', 'apple', 'userToken', 'userPassword').required(),
    token: Joi.string().required(),
    date: Joi.date().iso().required(),
    appId: Joi.string().required(),
    userName: Joi.string().optional(),
    password: Joi.string().optional()
});

module.exports = AuthenticationRequestSchema;

