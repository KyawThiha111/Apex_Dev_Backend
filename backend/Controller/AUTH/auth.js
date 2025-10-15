
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express")
const User = require("../../Model/Auth/auth.js")
const router = express.Router();

// SIGN UP
exports.SignUp = async(req,res)=>{
    try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      studentid,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id,studentname:user.name,email:user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      success:true,
      token
    });
  } catch (err) {
    res.status(500).json({success:false, message: "Signup failed", error: err.message });
  }
}

// LOGIN
exports.Login = async(req,res)=>{
    try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id,studentid:user.studentid,studentname:user.name,email:user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success:true,token:token
    });
  } catch (err) {
    res.status(500).json({success:false, message: "Login failed", error: err.message });
  }
}
