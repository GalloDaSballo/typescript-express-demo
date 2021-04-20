import express from "express";
import crypto from "crypto";

import db from "../db";

const router = express.Router();

router.post("/login", (req, res) => {
  console.log("login");
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send("Please use email");
  }

  if (!password) {
    return res.status(400).send("Please use password");
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  // Check if user already exists
  const already = await db("users").where({ email }).first();
  if (already) {
    return res.status(400).send("User already exists");
  }

  const insert = await db("users")
    .insert({ email, password: hash, salt })
    .returning(["id", "email"]);

  res.send(insert);
});

export default router;
