import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    googleId: String,
    username: String,
    email: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("user", UserSchema);