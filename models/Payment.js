import Joi from 'joi';
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
      type: String,
      required : true
    },
    time: {
      type: String,
      required : true,
    },
    amount : {
      type : String,
      required : true,
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    }
  });
  
  export const Payment = mongoose.model("Payment", paymentSchema);
  
  // Function to validate key collection
  export function validatPayment(payment) {
      const paymentSchema = Joi.object({
          userId : Joi.string().required(),
          date: Joi.string().required(),
          time : Joi.string().required(),
          amount : Joi.string().required(),
          status : Joi.boolean()
      })
  
      return paymentSchema.validate(payment);
  }