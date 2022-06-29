import Joi from "joi";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 2,
    maxlength: 50,
    default: "First Name",
  },
  lastname: {
    type: String,
    minlength: 2,
    maxlength: 50,
    default: "Last Name",
  },
  username: {
    type: String,
    minlength: 2,
    maxlength: 50,
    require : true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  nic : {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    maxlength: 255,
    default : 'Address'
  },
  gender: {
    type: Boolean,
    default : true,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 14,
  },
  imageUrl: {
    type: String,
  },
  isActive: {
    type: Boolean,
    required : true,
    default : true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
      {
          _id: this._id,
      },
      process.env.JWTPRIVATEKEY
  );
  return token;
};

export const User = mongoose.model("User", userSchema);

// Function to validate user collection
export function validateUser(user) {
    const userSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(255).required(),
        username: Joi.string().min(3).max(50).required(),
        nic: Joi.string().max(12).min(10).required(),
        phone: Joi.string().max(12).min(9).required(),
        firstname : Joi.string().min(3).max(100),
        lastname : Joi.string().min(3).max(100),
        gender: Joi.boolean(),
        address: Joi.string().max(255),
        imageUrl : Joi.string()
    })

    return userSchema.validate(user);
}
