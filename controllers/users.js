import express from 'express';
import bcrypt from 'bcrypt';
import Joi from "joi";

// Models
import { User, validateUser } from '../models/Users.js';

//Middleware
import authenticated from '../middlewares/Auth.js';

const userRouter = express.Router();

userRouter.post('/', async (req,res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(500).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User Already Registered!");

    const {username, email, password, nic, phone} = req.body;

    user = new User({
        username : username,
        email : email,
        password : password,
        nic : nic,
        phone : phone,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header("auth-token", token).send(user);
})

userRouter.get('/me', authenticated, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('Clients Not Found!');

    res.send(user);
})

userRouter.get('/', authenticated, async (req, res) => {
    const users = await User
        .find()
        .select('-__v -_id')
        .sort('username');

    if (!users) return res.status(404).send('Clients Not Found!');

    res.send(users);
})

userRouter.put('/', authenticated, async (req,res) => {
    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('Cannot Find Your Profile!');

    const {username, phone, firstname, lastname, gender, address } = req.body;

    const { error } = validateUpdate(req.body);
    if (error) return res.status(500).send(error.message);

    user.username = username,
    user.phone = phone,
    user.firstname = firstname,
    user.lastname = lastname,
    user.gender = gender,
    user.address = address

    await user.save();

    res.send(user);
})

userRouter.put('/changepassword', authenticated, async (req,res) => {
    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('Cannot Find Your Profile!');

    const { currentPassword, newPassword } = req.body;

    const validPassword = await bcrypt.compare( currentPassword, user.password);
    if (!validPassword) return res.status(400).send("Current Password is Incorrect!");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash( newPassword, salt);

    await user.save();

    res.status(200).send(user);
})

userRouter.delete('/deleteaccount', authenticated, async (req,res) => {
    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('Cannot Find Your Profile!');

    user.isActive = false;

    await user.save();

    res.status(200).send(user);
})

// Function to validate user collection
function validateUpdate(user) {
    const updateSchema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        phone: Joi.string().max(12).min(9).required(),
        firstname : Joi.string().min(3).max(100).required(),
        lastname : Joi.string().min(3).max(100).required(),
        gender: Joi.boolean().required(),
        address: Joi.string().max(255).required()
    })

    return updateSchema.validate(user);
}

export default userRouter;