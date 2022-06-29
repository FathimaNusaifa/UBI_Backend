import express from 'express';

// Models
import { Key, validateKey } from '../models/Key.js';

//Middleware
import authenticated from '../middlewares/Auth.js';

const keyRouter = express.Router();

keyRouter.post('/', async (req,res) => {
    const { error } = validateKey(req.body);
    if (error) return res.status(500).send(error.message);

    const {verificationKey} = req.body;

    let key = await Key.findOne({ key: verificationKey });
    if (key) return res.status(400).send("key Already Exists!");

    key = new Key({
        key : verificationKey
    });

    await key.save();

    res.status(200).send(key);
})

keyRouter.post('/key', async (req, res) => {
    let key = await Key.findOne({ key: req.body.verificationKey });
    if (!key) return res.status(400).send("Invalid Verification Key!");
    if(key.isExpired) return res.status(400).send("Your Key is Expired!");

    res.status(200).send(key);
})

keyRouter.put('/', authenticated, async (req,res) => {
    let key = await Key.findById(req.body.verificationToken);
    if (!key) return res.status(400).send("Invalid Verification Key!");
    if(key.isExpired) return res.status(400).send("Your Key is Already Expired!");

    key.isExpired = true;
    await key.save();

    res.status(200).send(key);
})

export default keyRouter;