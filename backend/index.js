import express from "express";
import chalk from "chalk";
import cors from 'cors';
import { PORT } from './config/config.js';
import userRouter from './router/router.js';
import { connect } from './config/db.config.js';

// Connect to the database
connect();

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use userRouter for /api/user routes
app.use('/api/user', userRouter);

// Start the server and handle errors
app.listen(PORT, () => {
    console.log(chalk.green.bold(`Server is running successfully on port ${PORT}`));
}).on('error', (err) => {
    console.error(chalk.red.bold('Failed to start server:', err.message));
});

