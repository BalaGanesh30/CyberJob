import { useState } from "react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import API from "../../uitiles/api";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

export default function Createform() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("FullTime");
  const [salaryMin, setSalaryMin] = useState();
  const [salaryMax, setSalaryMax] = useState();
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const { setUser, isModalOpen, setIsModalOpen } = useAppContext();

  // Validation function (unchanged)
  const validateForm = () => {
    if (
      !jobTitle ||
      !companyName ||
      !location ||
      !salaryMin ||
      !salaryMax ||
      !deadline ||
      !description
    ) {
      toast.error("Please fill all the fields.");
      return false;
    }

    if (parseInt(salaryMin) > parseInt(salaryMax)) {
      toast.error("Minimum salary cannot be greater than maximum salary.");
      return false;
    }

    if (parseInt(salaryMin) < 0 || parseInt(salaryMax) < 0) {
      toast.error("Salary values must be non-negative.");
      return false;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    if (deadline < currentDate) {
      toast.error("Application deadline cannot be in the past.");
      return false;
    }

    return true;
  };

  // Save draft and publish functions (unchanged)
  const handleSaveDraft = async (e) => {
    e.stopPropagation();
    if (!validateForm()) return;

    const payload = {
      jobTitle,
      companyName,
      location,
      jobType,
      salaryMin,
      salaryMax,
      deadline,
      description: description.split("\n"),
      status: "Draft",
    };

    try {
      const response = await API.post("/job", payload);
      if (response.data.success) {
        toast.success("Job draft saved!");
        setIsModalOpen(false);
        // Reset form fields
        setJobTitle("");
        setCompanyName("");
        setLocation("");
        setJobType("FullTime");
        setSalaryMin("");
        setSalaryMax("");
        setDeadline("");
        setDescription("");
      } else {
        toast.error(response.data.message || "Failed to save draft");
      }
    } catch (error) {
      console.error("Save draft error:", error);
      toast.error(error.response?.data?.message || "Error saving draft");
    }
  };

  const handlePublish = async (e) => {
    e.stopPropagation();
    if (!validateForm()) return;

    const payload = {
      jobTitle,
      companyName,
      location,
      jobType,
      salaryMin,
      salaryMax,
      deadline,
      description: description.split("\n"),
      status: "Published",
    };

    try {
      const response = await API.post("/job", payload);
      if (response.data.success) {
        toast.success("Job published!");
        setIsModalOpen(false);
        // Reset form fields
        setJobTitle("");
        setCompanyName("");
        setLocation("");
        setJobType("FullTime");
        setSalaryMin("");
        setSalaryMax("");
        setDeadline("");
        setDescription("");
      } else {
        toast.error(response.data.message || "Failed to publish");
      }
    } catch (error) {
      console.error("Publish error:", error);
      toast.error(error.response?.data?.message || "Error publishing job");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50 p-4"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl relative max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]"
        onClick={(e) => e.stopPropagation()}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            Create Job Opening
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Job Title */}
            <div>
              <label className="block mb-1 text-sm sm:text-base text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Full Stack Developer"
                className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base cursor-pointer"
                required
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block mb-1 text-sm sm:text-base text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Amazon, Microsoft, Swiggy"
                className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base cursor-pointer"
                required
              />
            </div>

            {/* Location and Salary Fields */}
            <div>
              <label className="block mb-1 text-sm sm:text-base text-gray-700">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base mb-3 sm:mb-4 cursor-pointer"
                required
              >
                <option value="">Choose Preferred Location</option>
                <option value="Remote">Remote</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="chennai">Chennai</option>
              </select>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block mb-1 text-sm sm:text-base text-gray-700">
                    Min Salary
                  </label>
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base cursor-pointer"
                    placeholder="₹0"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm sm:text-base text-gray-700">
                    Max Salary
                  </label>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base cursor-pointer"
                    placeholder="₹12,00,000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Job Type and Deadline */}
            <div>
              <label className="block mb-1 text-sm sm:text-base text-gray-700">
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base mb-3 sm:mb-4 cursor-pointer"
                required
              >
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Internship">Internship</option>
              </select>

              <div>
                <label className="block mb-1 text-sm sm:text-base text-gray-700">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="col-span-1 sm:col-span-2 mt-4 sm:mt-6">
              <label className="block mb-1 text-sm sm:text-base text-gray-700">
                Job Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please share a description to let the candidate know more about the job role cursor-pointer"
                className="w-full p-2 sm:p-3 border rounded-lg h-32 resize-none text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleSaveDraft}
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 border rounded-lg font-medium sm:font-semibold hover:bg-gray-100 transition flex items-center justify-center text-sm sm:text-base cursor-pointer"
            >
              Save Draft <MdKeyboardDoubleArrowDown className="ml-2" />
            </button>

            <button
              onClick={handlePublish}
              className="w-full sm:w-auto px-4 py-2 sm:px-8 sm:py-3 bg-blue-500 text-white font-medium sm:font-semibold rounded-lg hover:bg-blue-600 transition flex items-center justify-center text-sm sm:text-base cursor-pointer"
            >
              Publish <MdKeyboardDoubleArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
