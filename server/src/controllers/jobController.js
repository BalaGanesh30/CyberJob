import Job from "../models/jobModel.js";

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private
export const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      jobType,
      salaryMin,
      salaryMax,
      deadline,
      description,
    } = req.body;
    const userId = req.userId;
    const newJob = await Job.create({
      jobTitle,
      companyName,
      location,
      jobType,
      salaryMin,
      salaryMax,
      deadline,
      description,
      createdBy: userId, // if you store user ID from token
    });

    res.status(201).json({ success: true, job: newJob });
  } catch (error) {
    console.error("Create Job Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "Published" }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Get Jobs Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
export const updateJob = async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
