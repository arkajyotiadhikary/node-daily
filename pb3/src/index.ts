import express from "express";

import authRouter from './routers/auth';

const port: number = parseInt(process.env.PORT) || 8000;

const app = express();

// middlewares
app.use(express.json());

// routers
app.use('/',authRouter);


app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
});
