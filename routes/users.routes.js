import { Router } from "express";

import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", (request, response) => response.send({ title: "CREATE new user" }));
userRouter.put("/:id", (request, response) => response.send({ title: "UPDATE user" }));
userRouter.delete("/:id", (request, response) => response.send({ title: "DELETE user" }));

export default userRouter;
