import express, { Request, Response } from "express";

const port: number = parseInt(process.env.PORT) || 8000;

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Welcome to the server");
});
app.get("/api/greet/:name", (req: Request, res: Response) => {
      res.status(200).send(`Hello ${req.params.name}`);
});
app.post("/api/sum", (req: Request, res: Response) => {
      const numbers: number[] = req.body.numbers || [];
      const sum: number = numbers.reduce((acc, num) => acc + num, 0);
      res.status(200).json({ sum });
});

app.listen(port, () => [console.log(`server is running at port http://localhost:${port}`)]);
