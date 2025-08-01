import User from "../models/user.model.js";

export const getUsers = async (request, response, next) => {
  try {
    const users = await User.find();

    response.status(200).json({
      success: true,
      message: "GET users successfully",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (request, response, next) => {
  try {
    const id = request.params.id;
    const user = await User.findById(id).select("-password");

    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    response.status(200).json({
      success: true,
      message: "GET user successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
