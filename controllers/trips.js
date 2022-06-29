import express from 'express';

// Models
import { Trip, validatTrip } from '../models/Trips.js';

//Middleware
import authenticated from '../middlewares/Auth.js';

const tripsRouter = express.Router();

tripsRouter.post('/', async (req,res) => {
    const { error } = validatTrip(req.body);
    if (error) return res.status(500).send(error.message);

    const {userId,date,to,distance } = req.body;

    let trip = new Trip({
        userId : userId,
        date : date,
        to : to,
        distance : distance
    });

    await trip.save();

    res.status(200).send(trip);
})

tripsRouter.get('/', authenticated, async (req,res) => {
    let trips = await Trip.find({ userId : req.user._id});
    if (!trips) return res.status(400).send("No Trip Deatails Available!");

    res.status(200).send(trips);
})

export default tripsRouter;