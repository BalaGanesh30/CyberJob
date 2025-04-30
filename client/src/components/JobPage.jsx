import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import JobsList from "./JobsList";
import API from "../../uitiles/api";
import { assets } from "../assets/assets";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);

  // 🔍 Centralized filter state
  const [filters, setFilters] = useState({
    searchQuery: "",
    location: "Preferred Location",
    jobType: "Job Type",
    salaryRange: [50000, 80000],
  });

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await API.get("/job");
      const enrichedJobs = res.data.jobs.map((job) => ({
        ...job,
        salaryNum: job.salaryMax, // needed for numeric comparison
        salary: `${(job.salaryMax / 100000).toFixed()} LPA`,
        experience: "1-3 yrs",
        companyLogo: assets[job.companyName.toLowerCase()] || assets.amazon,
        postedTime: "24h Ago",
      }));
      setJobs(enrichedJobs);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {/* ⬇️ Filters controlled by parent */}
      <Filters filters={filters} setFilters={setFilters} />
      <JobsList jobs={jobs} filters={filters} />
    </div>
  );
}
