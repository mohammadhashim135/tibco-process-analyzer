import express from "express";
import cors from "cors";
import processRoutes from "./routes/process.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/process", processRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Backend is running"
  });
});

export default app;