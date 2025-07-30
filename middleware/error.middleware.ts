import type { Request, Response } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: Function) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    if (err.name === "castError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message);
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      const message = `Duplicate field value entered: ${err.keyValue.email}`;
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val: any) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;