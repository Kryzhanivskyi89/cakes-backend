const Joi = require("joi");

const { phoneRegexp, descriptionRegexp } = require("../../constants/patterns");

const ordersAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
        "string.empty": `name cannot be an empty field`,
    }),
    phone: Joi.string().pattern(phoneRegexp).required().messages({
        "any.required": `missing required phone field`,
        "string.empty": `phone cannot be an empty field`,
    }),
    description: Joi.string().pattern(descriptionRegexp).required().messages({
        "any.required": `missing required description field`,
        "string.empty": `description cannot be an empty field`,
    }),
});



module.exports = {
    ordersAddSchema,
    
};