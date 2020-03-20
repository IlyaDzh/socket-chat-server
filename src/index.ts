import express from 'express';

import './core/db';
import createRoutes from './core/routes';

const app = express();

createRoutes(app);

app.listen(3000, () => {
    console.log(`Example app listening on port 3000!`);
});