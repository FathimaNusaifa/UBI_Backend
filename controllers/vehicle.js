import express from 'express';

// Models
import { Vehicle, validatevehicle } from '../models/Vehicle.js';

//Middleware
import authenticated from '../middlewares/Auth.js';

const vehicleRouter = express.Router();

vehicleRouter.post('/', async (req,res) => {
    const { error } = validatevehicle(req.body);
    if (error) return res.status(500).send(error.message);

    const { userId, name, brand, category, model, year, chassisno } = req.body;

    let vehicle = new Vehicle({
        userId : userId,
        name : name,
        brand : brand,
        category : category,
        model : model,
        year : year,
        chassisNo : chassisno
    });

    await vehicle.save();

    res.status(200).send(vehicle);
})

vehicleRouter.get('/', authenticated, async (req,res) => {
    let vehicles = await Vehicle.findOne({ userId : req.user._id});
    if (!vehicles) return res.status(400).send("No Vehicle Details Available!");

    res.status(200).send(vehicles);
})

export default vehicleRouter;