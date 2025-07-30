import aj from "../config/arcjet.ts";
import type { Request, Response, NextFunction } from "express";

const arcjetMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decision = await aj.protect(req, {requested: 1});

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res
          .status(429)
          .json({ error: "Rate limit exceeded. Too many requests" });

      if (decision.reason.isBot())
        return res
          .status(403)
          .json({ error: "Access denied. Shield rule triggered" });

      return res.status(403).json({ error: "Access denied" });
    }
    next();

  } catch (error) {
    console.log("Arcjet Middleware Error:", error);
    next(error);
  }
};

export default arcjetMiddleware;