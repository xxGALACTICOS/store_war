import mongoose from "mongoose";
import { config } from "../../config/config.ts";
import { userSchema } from "./schemas/user.ts";

export let db: mongoose.Connection;
export async function connectDB() {
    await mongoose.connect(config.mongourl!);
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", async function() {
        console.log("connected to mongodb");
        const User = mongoose.model("User", userSchema);
        await User.createCollection();
        const user = new User({
            username: "ashraf",
            password: "123456",
            email: "ashraf@gmail.com",
            phone: "1234567890",
            address: "ashraf",
        });
        await user.save();
    });
    // db.models.User.createCollection()
}

