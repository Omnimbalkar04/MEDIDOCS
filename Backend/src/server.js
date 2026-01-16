import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";

const app = express();

const __dirname = path.resolve();


app.get("/app", (req, res) => {
  res.status(200).json({ message: "Welcome to Medidocs" });
})

//make app ready for deployment
if(ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../Frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log("Server is running on port", ENV.PORT);
});