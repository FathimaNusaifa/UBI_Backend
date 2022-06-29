import Joi from 'joi';
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
      type: String,
      required : true
    },
    to: {
      type: String,
      required : true,
    },
    distance : {
      type : String,
      required : true,
    },
  });
  
  export const Trip = mongoose.model("Trip", tripSchema);
  
  // Function to validate trip collection
  export function validatTrip(trip) {
      const tripSchema = Joi.object({
          userId : Joi.string().required(),
          date: Joi.string().required(),
          to : Joi.string().required(),
          distance : Joi.string().required()
      })
  
      return tripSchema.validate(trip);
  }