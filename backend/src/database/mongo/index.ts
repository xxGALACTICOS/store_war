import mongoose from "mongoose";
import { config } from "../../config/config.ts";
import { userSchema } from "./schemas/user.ts";

export let db: mongoose.Connection;
export async function connectDB() {
    await mongoose.connect(config.mongouri!);
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", async function() {
        console.log("connected to mongodb");
    });
    // db.models.User.createCollection()
}

