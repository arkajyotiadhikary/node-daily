import { Router, Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User, RequestBody } from "../models/user";

const router = Router();

// user list
let users: User[] = [];
const saltRounds: number = 10;

// user register
router.post("/register", async (req: Request, res: Response) => {
      const { username, password }: RequestBody = req.body;
      const user = users.find((user) => user.username === username);
      if (!user) {
            const hashedpassword = await bcrypt.hash(password, saltRounds);
            users.push({ username, hashedpassword });
            res.status(201).json({ message: "user has been registered succsessfully!!" });
      } else {
            res.status(409).json("username already exist!!");
      }
});

// user login
router.post("/login", async (req: Request, res: Response) => {
      const { username, password }: RequestBody = req.body;
      // check the username exist in the userlist
      const user = users.find((user) => user.username === username);

      // compare the password if user exist
      if (user && (await bcrypt.compare(password, user.hashedpassword))) {
            res.status(200).json({ message: "succsessfully login" });
      } else {
            res.status(401).json({ message: "failed login!!" });
      }
});

/* 
      we can use other 3rd party authenticator here . for practice purpose i have only this
      empty method
*/
const authenticate: (req: Request, res: Response, next: NextFunction) => void = (
      req,
      res,
      next
) => {
      // code s for authenticate user
      next();
};

// get userprofile
router.get("/profile", authenticate, async (req: Request, res: Response) => {
      res.status(200).json({ username: "arka", password: "test" });
});

export default router;
