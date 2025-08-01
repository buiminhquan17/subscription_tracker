import express from "express";
import cookieParser from "cookie-parser";

// env
import { PORT } from "./config/env.js";

// Routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/users.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import workflowRouter from "./routes/workflow.route.js";

// Database
import connectToDatabase from "./database/mongodb.js";

// Middlewares
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware);

app.get("/", (request, respone) => {
  respone.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API is running at http://localhost:${PORT}`);

  // Connect to database
  await connectToDatabase();
});

export default app;
