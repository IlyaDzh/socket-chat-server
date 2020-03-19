import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import { UserController } from './controllers';

const app = express();

app.use(bodyParser.json());

const User = new UserController();

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.get('/user/:id', User.show);
app.post('/user/create', User.create);
app.delete('/user/delete/:id', User.delete);

app.listen(3000, () => {
    console.log(`Example app listening on port 3000!`);
});