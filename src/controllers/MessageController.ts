import express from "express";

import { MessageModel } from "../models";

class MessageController {
    getAll(req: express.Request, res: express.Response) {
        MessageModel.find()
            .populate("author", "fullname avatar")
            .exec((err, messages) => {
                if (err) {
                    return res
                        .status(404)
                        .json({
                            status: "error",
                            message: "Message list is empty"
                        });
                }
                return res.json(messages);
            });
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            author: req.body.author,
            text: req.body.text
        };
        const message = new MessageModel(postData);
        message
            .save()
            .then((obj: any) => {
                obj.populate(
                    "author",
                    "fullname avatar",
                    (err: any, message: any) => {
                        if (err) {
                            return res
                                .status(404)
                                .json({ status: "error", message: err });
                        }
                        res.json(message);
                    }
                );
            })
            .catch(reason => {
                res.status(404).json(reason);
            });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        MessageModel.findOneAndRemove({ _id: id })
            .then(messageDel => {
                if (messageDel) {
                    res.status(404).json({
                        message: `Message "${messageDel.text}" deleted`
                    });
                }
            })
            .catch(() => {
                res.status(404).json({ message: `Message not found` });
            });
    }
}

export default MessageController;
