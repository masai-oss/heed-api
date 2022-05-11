import { Router } from "express";

const healthCheck = Router();

healthCheck.get("/health-check", (req, res) => {
  // TODO: add ping/time taken
  return res.send({
    status: 200,
    message: "All systems are online",
  });
});

export { healthCheck };
