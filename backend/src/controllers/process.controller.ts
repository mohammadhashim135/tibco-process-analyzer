import { Request, Response } from "express";
import { parseProcess } from "../parser/parseProcess.js";

export async function uploadProcess(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No .process file uploaded",
      });
    }

    const result = await parseProcess(req.file.path);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to parse process file",
    });
  }
}