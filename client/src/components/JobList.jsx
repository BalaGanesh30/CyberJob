import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import JobCard from "./JobCard";
import { assets } from "../assets/assets";
import API from "../../uitiles/api";

const companyLogos = {
  Amazon: assets.amazon,
  Flipkart: assets.testla,
  Swiggy: assets.swiggy,
  Google: assets.google,
  Testla: assets.testla,
  Zoho: assets.zoho, // Added Zoho with testla as placeholder
};

const JobsList = () => {
  const { filters } = useAppContext();
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to calculate time ago
  const getTimeAgo = (dateString) => {
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now - postedDate;

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}d Ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours}h Ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes}m Ago`;
    } else {
      return `Just now`;
    }
  };

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await API.get("/job");
        const jobsWithExtras = res.data.jobs.map((job) => ({
          ...job,
          salary: `${(job.salaryMax / 100000).toFixed()} LPA`,
          experience: "1-3 yrs",
          companyLogo: companyLogos[job.companyName] || assets.testla,
          postedTime: getTimeAgo(job.createdAt), // 👈 Here
        }));
        setAllJobs(jobsWithExtras);
        setJobs(jobsWithExtras);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filtering logic
  useEffect(() => {
    if (!allJobs.length) return;

    const filteredJobs = allJobs.filter((job) => {
      // Search filter
      const searchLower = filters.searchQuery.toLowerCase().trim();
      const isSearchMatch =
        searchLower === "" ||
        (job.jobTitle && job.jobTitle.toLowerCase().includes(searchLower)) ||
        (job.companyName &&
          job.companyName.toLowerCase().includes(searchLower));

      // Location filter
      const isLocationMatch =
        !filters.location ||
        filters.location === "Preferred Location" ||
        (job.location &&
          job.location.toLowerCase().includes(filters.location.toLowerCase()));

      // Job type filter
      const isJobTypeMatch =
        !filters.jobType ||
        filters.jobType === "Job Type" ||
        (job.jobType && job.jobType === filters.jobType);

      // Salary filter - convert annual to monthly for comparison
      const jobMinMonthly = job.salaryMin / 12;
      const jobMaxMonthly = job.salaryMax / 12;
      const [filterMin, filterMax] = filters.salaryRange || [50000, 80000];

      const isSalaryMatch =
        !filters.salaryRange ||
        (jobMaxMonthly >= filterMin && jobMinMonthly <= filterMax);

      return (
        isSearchMatch && isLocationMatch && isJobTypeMatch && isSalaryMatch
      );
    });

    setJobs(filteredJobs);
  }, [filters, allJobs]);

  if (loading) return <div className="text-center p-6">Loading jobs...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6 bg-gray-100 min-h-[300px]">
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job._id} {...job} />)
      ) : (
        <p className="text-gray-500 w-full text-center">
          No jobs found matching the selected filters.
        </p>
      )}
    </div>
  );
};

export default JobsList;
