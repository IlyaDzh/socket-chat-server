import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IUser extends Document {
    email: string;
    avatar: string;
    fullname: string;
    password: string;
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Email address is required!',
        validate: [isEmail, 'Invalid email']
    },
    avatar: String,
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    last_seen: Date
}, {
    timestamps: true
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;