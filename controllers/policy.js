import express from 'express';

// Models
import { Policy, validatePolicy } from '../models/Policy.js';

//Middleware
import authenticated from '../middlewares/Auth.js';

const policyRouter = express.Router();

policyRouter.post('/', async (req,res) => {
    const { error } = validatePolicy(req.body);
    if (error) return res.status(500).send(error.message);

    const { userId, number, dateOfIssue, expiryDate, coveringRange, policyValue } = req.body;

    let policy = new Policy({
        userId : userId,
        number : number,
        dateOfIssue : dateOfIssue,
        expiryDate : expiryDate,
        coveringRange : coveringRange,
        policyValue : policyValue
    });

    await policy.save();

    res.status(200).send(policy);
})

policyRouter.get('/', authenticated, async (req,res) => {
    let policies = await Policy.findOne({ userId : req.user._id});
    if (!policies) return res.status(400).send("No Policy Details Available!");

    res.status(200).send(policies);
})

export default policyRouter;