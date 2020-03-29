import mongoose, { Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface IUser extends Document {
    email: string;
    fullname: string;
    password: string;
    avatar: string;
    last_seen?: Date;
}

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: "Email address is required!",
            validate: [isEmail, "Invalid email"]
        },
        fullname: { type: String, required: "Fullname is required" },
        password: { type: String, required: "Password is required" },
        avatar: String,
        last_seen: { type: Date, default: new Date() }
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
