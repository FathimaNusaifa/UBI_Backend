import express from 'express';

// Models
import { Payment, validatPayment } from '../models/Payment.js';

//Middleware
import authenticated from '../middlewares/Auth.js';

const paymentRouter = express.Router();

paymentRouter.post('/', async (req,res) => {
    const { error } = validatPayment(req.body);
    if (error) return res.status(500).send(error.message);

    const {userId,date,time,amount,status} = req.body;

    let payment = new Payment({
        userId : userId,
        date : date,
        time : time,
        amount : amount,
        status : true
    });

    await payment.save();

    res.status(200).send(payment);
})

paymentRouter.get('/', authenticated, async (req,res) => {
    let payments = await Payment.find({ userId : req.user._id});
    if (!payments) return res.status(400).send("No Payment Deatails Available!");

    res.status(200).send(payments);
})

export default paymentRouter;