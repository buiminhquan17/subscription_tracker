import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

const authorize = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = request.headers.authorization.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Unauthorized",
        error: error.message,
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return response.status(401).json({
        message: "Unauthorized",
      });
    }

    request.user = user;

    next();
  } catch (error) {
    response.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};

export default authorize;
