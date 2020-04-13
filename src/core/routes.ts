import express from "express";
import cors from "cors";
import socket from "socket.io";
import bodyParser from "body-parser";

import { updateLastSeen, checkAuth } from "../middlewares";
import { signinValidation, signupValidation } from "../utils/validations";
import { UserController, MessageController } from "../controllers";

const createRoutes = (app: express.Express, io: socket.Server) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(checkAuth);
    app.use(updateLastSeen);

    const User = new UserController();
    const Message = new MessageController(io);

    app.get("/user/me", User.getMe);
    app.get("/user/all", User.getAll);
    app.post("/user/signup", signupValidation, User.create);
    app.post("/user/signin", signinValidation, User.login);
    app.get("/user/:id", User.showById);
    app.delete("/user/:id", User.delete);

    app.get("/messages", Message.getAll);
    app.post("/messages", Message.create);
    app.delete("/messages/:id", Message.delete);
};

export default createRoutes;
