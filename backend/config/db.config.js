import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./config.js";
import chalk from "chalk";

export async function connect() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log(chalk.white.bold(`MongoDB Connected: ${PORT}`));
    } catch (error) {
        console.error(chalk.red.bold(`MongoDB connection error: ${error.message}`));
    }
}
