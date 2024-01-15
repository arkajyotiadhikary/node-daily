import { Router, Request, Response } from "express";

import { Task } from "../models/task";

const router = Router();

let tasks: Task[] = [];

// Get all todos
router.get("/", (req: Request, res: Response) => {
      res.json(tasks);
});
// Create todos
router.post("/", (req: Request, res: Response) => {
      console.log(req.body);
      const task: Task = {
            id: tasks.length + 1,
            title: req.body.title,
            description: req.body.description,
            done: false,
      };
      tasks.push(task);
      res.status(201).json(task);
});

// Update todos
router.put("/:id", (req: Request, res: Response) => {
      const task = tasks.find((task) => task.id === parseInt(req.params.id));
      if (!task) {
            res.status(404).send("Task not found!!");
      } else {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.done = req.body.done || task.done;
            res.status(202).send(task);
      }
});

// Delete todos
router.delete("/:id", (req: Request, res: Response) => {
      const index = tasks.findIndex((task) => task.id === parseInt(req.params.id));
      tasks.splice(index, 1);
      res.status(203).send();
});

export default router;
