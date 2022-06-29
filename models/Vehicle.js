import Joi from 'joi';
import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
      type: String,
      required : true
    },
    brand: {
      type: String,
      required : true,
    },
    category : {
      type : String,
      required : true,
    },
    model : {
        type : String,
        required : true,
    },
    year : {
        type : String,
        required : true,
    },
    chassisNo : {
        type : String,
        required : true,
    },
  });
  
  export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
  
  // Function to validate trip collection
  export function validatevehicle(vehicle) {
      const vehicleSchema = Joi.object({
          userId : Joi.string().required(),
          name: Joi.string().required(),
          brand : Joi.string().required(),
          category : Joi.string().required(),
          model : Joi.string().required(),
          year : Joi.string().required(),
          chassisno : Joi.string().required()
      })
      return vehicleSchema.validate(vehicle);
  }