import Joi from "joi";

export const studentAddV = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().lowercase().email().required().max(60),
    phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(4)
        .max(13)
        .required(),
    dob: Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string(),
    zip: Joi.string(),
    gender: Joi.string()
});

export const studentUpdateV = Joi.object({
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().lowercase().email().required().max(60),
    phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(4)
        .max(13)
        .required(),
    dob: Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string(),
    zip: Joi.string(),
    gender: Joi.string()
});

export const studentListV = Joi.object({
    page: Joi.string().allow(),
    perPage: Joi.string().allow(),
    sortField: Joi.string().allow(),
    sortBy: Joi.string().allow(),
    search: Joi.string().optional().allow('')
});

export const studentGetV = Joi.object({
    user_id: Joi.string().required(),
});