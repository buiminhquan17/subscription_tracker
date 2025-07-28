import aj from "../config/arcjet.js";

const arcjetMiddleware = async (request, response, next) => {
  try {
    const decision = await aj.protect({ requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return response.status(429).json({
          error: "Rate limit exceeded",
        });
      }

      if (decision.reason.isBot()) {
        return response.status(403).json({
          error: "Bot detected",
        });
      }

      return response.status(403).json({
        error: "Access denied",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
