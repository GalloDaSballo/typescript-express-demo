import express from "express";
import basicRoutes from "./basic";

const router = express.Router();

router.use("/basic", basicRoutes);

export default router;
