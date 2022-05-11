import express from "express";
import { healthCheck } from "./Routes";

const app = express();

app.use("/v1", healthCheck);

app.listen(8080, () => {
  console.log("Server started at http://localhost:8080/");
});
