import express from 'express';

// Importing Routes
import userRouter from '../controllers/users.js';
import authRouter from '../controllers/auth.js';
import imageUpload from '../controllers/upload.js';
//import passwordRouter from '../controllers/password.js';

// Middlewares
import ErrorHandler from '../middlewares/ErrorHandler.js';

export default function routes(app) {
    // Middlewares in priority
    app.use(express.json());

    // Config Routers
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/imageupload', imageUpload);
    //app.use('/api/reset', passwordRouter);

    // Configuring error handling Middleware
    app.use(ErrorHandler);
}