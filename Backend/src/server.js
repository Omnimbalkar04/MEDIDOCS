import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
})

app.use(express.json());

app.listen(ENV.PORT, () => {
  console.log("Server is running on port", ENV.PORT);
});