import { Router } from "express";

import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (request, response) => {
  response.send({ title: "GET all subscriptions" });
});

subscriptionRouter.get("/:id", (request, response) => {
  response.send({ title: "GET subscription detail" });
});

subscriptionRouter.get("/users/:id", (request, response) => {
  response.send({ title: "GET all user subscriptions" });
});

subscriptionRouter.get("/upcoming-renewals", (request, response) => {
  response.send({ title: "GET upcoming renewals" });
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (request, response) => {
  response.send({ title: "CANCEL subscription" });
});

subscriptionRouter.delete("/:id", (request, response) => {
  response.send({ title: "DELETE subscription" });
});

export default subscriptionRouter;
