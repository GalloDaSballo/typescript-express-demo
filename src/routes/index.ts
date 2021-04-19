import express from "express";
import basicRoutes from "./basic";
import productsRoutes from "./products";

const router = express.Router();

router.use("/basic", basicRoutes);
router.use("/products", productsRoutes);

export default router;
