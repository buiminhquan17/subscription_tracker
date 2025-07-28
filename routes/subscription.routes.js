import { Router } from "express";

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

subscriptionRouter.post("/", (request, response) => {
  response.send({ title: "CREATE subscription" });
});

subscriptionRouter.put("/:id", (request, response) => {
  response.send({ title: "UPDATE subscription" });
});

subscriptionRouter.put("/:id/cancel", (request, response) => {
  response.send({ title: "CANCEL subscription" });
});

subscriptionRouter.delete("/:id", (request, response) => {
  response.send({ title: "DELETE subscription" });
});

export default subscriptionRouter;
