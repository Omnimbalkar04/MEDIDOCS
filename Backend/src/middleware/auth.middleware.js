import jwt from "jsonwebtoken";
import User from "../models/User.js"
import { ENV } from "../lib/env.js";


export const protectedRoute = async (req, res, next) =>  {

  try {
      const token = req.cookies.jwt;

      if(!token){
        return res.status(401).json({ message: "Unauthorized - No token provided" });
      }

      const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY );

      if(!decoded){
        return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
      }

      const user = await User.findById(decoded.userId).select("-password");

      if(!user){
        return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
      }

      req.user = user;
 
      next()

  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    return res.status(500).json({ message: "Internal Server Error" });

  }
}

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return res.status(403).json({ message: "Access denied" })
    }
    next()
  }

}