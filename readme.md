If you want to build a Student CRUD API using Node.js, Express, MongoDB, and Mongoose, here’s a clean beginner-friendly structure.

1. Install dependencies
npm init -y
npm install express mongoose dotenv

2. Project structure
student-api/
├── models/
│   └── Student.js
├── routes/
│   └── studentRoutes.js
├── .env
├── server.js
└── package.json

3. Student model — models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

4. Routes — routes/studentRoutes.js
const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// CREATE student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({
      message: "Invalid student ID",
    });
  }
});

// UPDATE student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid student ID",
    });
  }
});

module.exports = router;

5. Server — server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

6. .env
For local MongoDB:

MONGO_URI=mongodb://127.0.0.1:27017/studentDB

Or with MongoDB Atlas:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studentDB

7. API endpoints
Method	Endpoint	Purpose
POST	/api/students	Create student
GET	/api/students	Get all students
GET	/api/students/:id	Get one student
PUT	/api/students/:id	Update student
DELETE	/api/students/:id	Delete student

Example POST /api/students body:

{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "age": 21,
  "course": "Computer Science"
}

This gives you a complete MongoDB + Mongoose Student CRUD API.