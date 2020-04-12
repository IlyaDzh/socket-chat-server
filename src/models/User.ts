import mongoose, { Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import { generatePasswordHash } from "../utils";

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

UserSchema.pre("save", async function (next) {
    const user: any = this;

    if (!user.isModified("password")) {
        return next();
    }

    user.password = await generatePasswordHash(user.password);
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
