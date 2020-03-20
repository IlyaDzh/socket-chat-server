import express from "express";
import bodyParser from "body-parser";

import { UserController, MessageController } from '../controllers';

const createRoutes = (app: express.Express) => {
    app.use(bodyParser.json());

    const User = new UserController();
    const Message = new MessageController();

    app.get('/user/me', User.getMe);
    app.get('/user/all', User.getAll);
    app.post('/user/signup', User.create);
    app.get('/user/:id', User.showById);
    app.delete('/user/:id', User.delete);

    app.get('/messages', Message.getAll);
    app.post('/messages', Message.create);
    app.delete('/messages/:id', Message.delete);
}

export default createRoutes;