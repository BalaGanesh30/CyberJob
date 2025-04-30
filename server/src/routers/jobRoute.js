import express from "express";
import { authenticateToken } from "../middleware/authToken.js"; // assuming you already have auth middleware
import {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (only authenticated users can create jobs)
router.post("/", authenticateToken, createJob);

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get("/", getAllJobs);

// @route   GET /api/jobs/:id
// @desc    Get a single job by ID
// @access  Public
router.get("/:id", getJobById);

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private (only the user who created the job can update it)
router.put("/:id", authenticateToken, updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private (only the user who created the job can delete it)
router.delete("/:id", authenticateToken, deleteJob);

export default router;
