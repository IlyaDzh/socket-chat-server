import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    author: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    text: string;
}

const MessageSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", require: true },
        text: String
    },
    {
        timestamps: true
    }
);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
