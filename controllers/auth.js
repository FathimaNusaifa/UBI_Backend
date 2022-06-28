import Joi from 'joi';
import express from 'express';
import bcrypt from 'bcrypt';

// Importing Modules
import { User } from '../models/Users.js';

const authRouter = express.Router();

authRouter.post('/', async (req, res) => {
    const { error } = validateCredentials(req.body);
    if (error) return res.send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User Not Registered!");

    if(!user.isActive) return res.status(400).send("You are inactive user! Contact admin to activate your Account!");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid Password!");

    const token = user.generateAuthToken();

    res.send(token);
})

// Function to validate Objects
function validateCredentials(req) {
    const authSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    })

    return authSchema.validate(req);
}

export default authRouter;