const mongoose = require("mongoose");
const Joi = require('joi');

const { Schema, model } = mongoose;

const usersSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, {versionKey: false, timestamps: true});

const User = model("user", usersSchema);

const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string().valid("starter", "pro", "business").default("starter"),
    token: Joi.string().default(null),
});


module.exports = {
    User,
    userSchema
}