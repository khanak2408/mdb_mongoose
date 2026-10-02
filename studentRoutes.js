const express = require("express");
const Student = require("../Models/Student");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
