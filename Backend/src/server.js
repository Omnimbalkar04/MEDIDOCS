import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./router/auth.route.js";

const app = express();

const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));


app.use("/api/v1/auth", authRoutes)

//make app ready for deployment
if(ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../Frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}



const startServer = async () => {
  
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  
  });
  } catch (error) {
    console.error("Server connection failed",error);
  }
};

startServer();