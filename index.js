import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Startups
import initializeDBConnection from './start/dbConnection.js';
import CORS from './start/cors.js';
import routes from './routes/routes.js';

//Global App Configurations
const app = express();
dotenv.config();

//DBConnection
initializeDBConnection();

// Enabling Cross-oring-Resource-Sharing
CORS(app);

// Configuring Routes
routes(app);

// Making storagefilder as a static
const __dirname = path.resolve();
app.use('/storage/images', express.static(path.join(__dirname, '/storage/images')));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});