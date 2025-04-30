import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    salaryMin: { type: Number, required: true },
    salaryMax: { type: Number, required: true },
    deadline: { type: Date, required: true },
    description: { type: Array, required: true }, // ✅ description as array of lines
    status: { type: String},
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Job = mongoose.models.job || mongoose.model("job", jobSchema);

export default Job;
