import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (request, response, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Logic to create new user
    const { name, email, password } = request.body;

    // Check if the user is exist
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      const error = new Error("User already exist");
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Create new user
    const newUser = await User.create([{ name, email, password: hashedPassword }], { session });

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await session.commitTransaction();
    session.endSession();

    response.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    response.status(200).json({
      success: true,
      message: "Signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (request, response, next) => {
  response.send({ title: "Signing out account..." });
};
