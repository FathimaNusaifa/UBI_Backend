import Joi from "joi";
import mongoose from "mongoose";

const keySchema = new mongoose.Schema({
  key: {
    type: String,
    required : true
  },
  createdAt: {
    type: Date,
    required : true,
    default : Date.now()
  },
  isExpired : {
    type : Boolean,
    required : true,
    default : false
  }
});

export const Key = mongoose.model("Key", keySchema);

// Function to validate key collection
export function validateKey(key) {
    const keySchema = Joi.object({
        verificationKey: Joi.string().required(),
    })

    return keySchema.validate(key);
}