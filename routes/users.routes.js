import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (request, response) => response.send({ title: "GET all users" }));
userRouter.get("/:id", (request, response) => response.send({ title: "GET user detail" }));
userRouter.post("/", (request, response) => response.send({ title: "CREATE new user" }));
userRouter.put("/:id", (request, response) => response.send({ title: "UPDATE user" }));
userRouter.delete("/:id", (request, response) => response.send({ title: "DELETE user" }));

export default userRouter;
