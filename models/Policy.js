import Joi from 'joi';
import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    number: {
      type: String,
      required : true
    },
    dateOfIssue: {
      type: String,
      required : true,
    },
    expiryDate : {
      type : String,
      required : true,
    },
    coveringRange : {
        type : String,
        required : true,
    },
    policyValue : {
        type : String,
        required : true,
    },
  });
  
  export const Policy = mongoose.model("Policy", policySchema);
  
  // Function to validate trip collection
  export function validatePolicy(policy) {
      const policySchema = Joi.object({
          userId : Joi.string().required(),
          number: Joi.string().required(),
          dateOfIssue : Joi.string().required(),
          expiryDate : Joi.string().required(),
          coveringRange : Joi.string().required(),
          policyValue : Joi.string().required()
      })
      return policySchema.validate(policy);
  }