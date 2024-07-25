import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username: username });
    if (existing) {
      return res.status(400).json({ message: "User already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username: username, password });

    await newUser.save();

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username: username });
    if (existing) {
      return res.status(400).json({ message: "User already registered" });
    }

    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }

    const token = jwt.sign(
      {
        userId: existing._id,
        username: existing.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.status(201).json({'token': token, "USERID": existing._id})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

