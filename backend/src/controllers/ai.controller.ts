import { Request, Response } from "express";
import { analyzeProcess } from "../services/ai.service.js";

export async function analyze(req: Request, res: Response) {
  try {
    const processData = req.body.data ?? req.body;

    const result = await analyzeProcess(processData);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("AI Analysis Error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "AI analysis failed",
    });
  }
}