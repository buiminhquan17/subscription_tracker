import Subscription from "../models/subscription.model.js";

export const createSubscription = async (request, response, next) => {
  try {
    const subscription = await Subscription.create({
      ...request.body,
      user: request.user._id,
    });

    response.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (request, response, next) => {
  try {
    const userId = request.user.id;

    if (userId !== request.params.id) {
      const error = new Error("You are not the owner");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: userId });

    response.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
