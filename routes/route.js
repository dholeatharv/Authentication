import { Router } from "express";
import User from "../model/connection.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({
        Message: "User already exits",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json({
      Success: "User created Succesfully",
      newUser,
    });
  } catch (error) {
    console.error("Something went wrong");
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        Message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.json({
      message: "Login Success",
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Something went wrong");
  }
});

export default router;
