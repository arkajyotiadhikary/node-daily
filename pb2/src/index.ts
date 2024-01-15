import express from "express";

const port: number = parseInt(process.env.PORT) || 8000;

// Routes
import taskRoutes from "./routers/tasks";

const app = express();
app.use(express.json());

app.use("/todos", taskRoutes);

app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
});
