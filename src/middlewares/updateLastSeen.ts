import express from "express";
import { UserModel } from "../models";

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    UserModel.findOneAndUpdate(
        {
            _id: "13123jsdf123"
        },
        {
            last_seen: new Date()
        },
        {
            new: true
        },
        () => {}
    );
    next();
};
