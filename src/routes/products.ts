import express from "express";
import db from "../db";

const router = express.Router();

export default router;

interface Product {
  name: string;
  price: string;
}

router.get("/", async (req, res) => {
  const result = await db.select<Product>().table("products");
  res.send(result);
});

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  if (!name) {
    return res.status(400).send("Please have a product name");
  }

  if (!price) {
    return res.status(400).send("Please have a product price");
  }

  const result = await db<Product>("products")
    .insert({ name, price })
    .returning("*");

  res.send(result);
});
