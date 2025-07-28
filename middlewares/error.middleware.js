const MONGOOSE_CAST_ERROR = "CastError";
const MONGOOSE_DUPLICATE_KEY = 11000;
const MONGOOSE_VALIDATION_ERROR = "ValidationError";

const errorMiddleware = (error, request, response, next) => {
  try {
    let _error = { ...error };
    _error.message = error.message;
    console.error(error);

    if (error.name === MONGOOSE_CAST_ERROR) {
      const message = "Resources not found";
      _error = new Error(message);
      _error.statusCode = 404;
    }

    if (error.code === MONGOOSE_DUPLICATE_KEY) {
      const message = "Duplicate field value entered";
      _error = new Error(message);
      _error.statusCode = 400;
    }

    if (error.name == MONGOOSE_VALIDATION_ERROR) {
      const message = Object.values(error.errors).map((value) => value.message);
      _error = new Error(message.join(", "));
      _error.statusCode = 400;
    }

    response
      .status(_error.statusCode || 500)
      .json({ success: false, error: _error.message || "Server Error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
