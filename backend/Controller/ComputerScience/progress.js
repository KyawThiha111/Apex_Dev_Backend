const express = require("express");
const router = express.Router();
const ComputerScienceProgress = require("../../Model/ComputerScience/computerscience.progress.js")
const authMiddleware = require("../../MIDDLEWARE/auth.middleware.js"); // verifies JWT, sets req.user.id

// ✅ Get current progress
const GetCSProgress = async(req,res)=>{
    try {
    const progress = await ComputerScienceProgress.findOne({ userId: req.user.id });
    if (!progress) {
      // create empty progress if not exists
      const newProgress = await ComputerScienceProgress.create({ userId: req.user.id });
      return res.status(201).json({success:true,progress:newProgress});
    }
   return res.status(200).json({success:true,progress:progress});
  } catch (err) {
    console.error(err);
    res.status(500).json({success:false, error: "Server error" });
  }
}

// ✅ Update progress (mark chapter completed)
const UpdateCSProgress = async(req,res)=>{
   try {
    const { subject, chapterId } = req.params;
    const chapterNum = parseInt(chapterId, 10);

    let progress = await ComputerScienceProgress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await ComputerScienceProgress.create({ userId: req.user._id });
    }

    if (!progress.progress[subject]) {
      return res.status(400).json({ message: "Invalid subject name" });
    }

    // avoid duplicates
    if (!progress.progress[subject].includes(chapterNum)) {
      progress.progress[subject].push(chapterNum);
      await progress.save();
    }

    res.json(progress);
  } catch (err) {
    console.error("Update Progress Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {GetCSProgress,UpdateCSProgress}

