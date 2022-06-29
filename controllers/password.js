import express from 'express';
import bcrypt from 'bcrypt';

// Models
import { Key } from '../models/Key.js';
import { User } from '../models/Users.js';

//Middleware
import authenticated from '../middlewares/Auth.js';

const resetRouter = express.Router();

resetRouter.post('/vefifykey', async (req, res) => {
    let key = await Key.findOne({ key: req.body.verificationKey });
    if (!key) return res.status(400).send("Invalid Verification Key!");
    if(key.isExpired) return res.status(400).send("Your Key is Expired!");

    res.status(200).send(key);
})

resetRouter.post('/resetpassword', async (req,res) => {
    if(!req.body.email) return res.status(500).send("Email is Required!");
    if(!req.body.verificationKey) return res.status(500).send("Verification Key is Required!");

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("You are not a Registered User!");

    const { verificationKey, newPassword } = req.body;

    let key = await Key.findOne({ key: verificationKey });
    if (!key) return res.status(400).send("Invalid Verification Key!");
    if(key.isExpired) return res.status(400).send("Your Key is Expired!");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash( newPassword, salt);

    await user.save();

    key.isExpired = true;
    await key.save();

    res.status(200).send(user);
})

export default resetRouter;