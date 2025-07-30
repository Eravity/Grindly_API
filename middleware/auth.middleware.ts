import type { Request, Response, NextFunction } from "express";

// Extend the Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.ts";
import User from "../models/user.ts";

interface JwtPayload {
  userId: string;
}

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access, no token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    req.user = user; 
    next();

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
      error: errorMessage,
    });
  }
};

export default authorize;