const { Schema, SchemaTypes, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
