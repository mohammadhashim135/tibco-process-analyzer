import { Router } from "express";
import { upload } from "../config/multer.js";
import { uploadProcess } from "../controllers/process.controller.js";

const router = Router();

router.post("/upload", upload.single("process"), uploadProcess);

export default router;