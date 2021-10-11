const mongoose = require("mongoose");
const Joi = require('joi');

const { Schema, model } = mongoose;

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },  
});

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean().default(false),
});

const patchSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean().required(),
});

module.exports = {
    Contact,
    addSchema,
    patchSchema,
    favoriteSchema
}