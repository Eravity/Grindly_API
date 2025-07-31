import aj from "../config/arcjet.js";
import type { Request, Response, NextFunction } from "express";

const arcjetMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decision = await aj.protect(req, {requested: 1});

    if (decision.isDenied()) {
      // Check if it's a development tool (Postman, Insomnia, etc.)
      const userAgent = req.get('User-Agent') || '';
      const isDevelopmentTool = userAgent.includes('PostmanRuntime') || 
                               userAgent.includes('Insomnia') ||
                               userAgent.includes('Thunder Client') ||
                               userAgent.includes('REST Client');

      console.log("Arcjet decision:", {
        type: decision.reason.type,
        ip: req.ip,
        userAgent: userAgent,
        path: req.path,
        method: req.method,
        isDevelopmentTool
      });

      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ 
            success: false,
            error: "Rate limit exceeded. Too many requests",
            retryAfter: decision.reason.resetTime 
          });
      }

      if (decision.reason.isBot()) {
        // Allow development tools in development environment
        if (isDevelopmentTool && process.env.NODE_ENV !== 'production') {
          console.log("Allowing development tool to bypass bot protection");
          return next();
        }

        return res
          .status(403)
          .json({ 
            success: false,
            error: "Access denied. Request appears to be automated",
            reason: "bot_detection"
          });
      }

      return res.status(403).json({ 
        success: false,
        error: "Access denied",
        reason: decision.reason.type 
      });
    }
    
    next();

  } catch (error) {
    console.error("Arcjet Middleware Error:", error);
    // In case of arcjet failure, allow the request to proceed
    next();
  }
};

export default arcjetMiddleware;