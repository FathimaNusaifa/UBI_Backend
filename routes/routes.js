import express from 'express';

// Importing Routes
import userRouter from '../controllers/users.js';
import authRouter from '../controllers/auth.js';
import imageUpload from '../controllers/upload.js';
import keyRouter from '../controllers/key.js';
import paymentRouter from '../controllers/payment.js';
import policyRouter from '../controllers/policy.js';
import vehicleRouter from '../controllers/vehicle.js';
import tripsRouter from '../controllers/trips.js';
import resetRouter from '../controllers/password.js';

// Middlewares
import ErrorHandler from '../middlewares/ErrorHandler.js';

export default function routes(app) {
    // Middlewares in priority
    app.use(express.json());

    // Config Routers
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/imageupload', imageUpload);
    app.use('/api/verifykey', keyRouter);
    app.use('/api/payments', paymentRouter);
    app.use('/api/policies', policyRouter);
    app.use('/api/vehicles', vehicleRouter);
    app.use('/api/trips', tripsRouter);
    app.use('/api/reset', resetRouter);

    // Configuring error handling Middleware
    app.use(ErrorHandler);
}