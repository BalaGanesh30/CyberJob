import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useAppContext } from "../context/AppContext"; // Import context

export default function Filters() {
  const { filters, setFilters } = useAppContext(); // Get filters and setFilters from context
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const [location, setLocation] = useState(filters.location);
  const [jobType, setJobType] = useState(filters.jobType);
  const [salaryRange, setSalaryRange] = useState(filters.salaryRange);
  const [activeThumb, setActiveThumb] = useState(null);
  const sliderRef = useRef(null);

  // Update filters when input values change
  useEffect(() => {
    setFilters({
      ...filters,
      searchQuery,
      location,
      jobType,
      salaryRange,
    });
  }, [searchQuery, location, jobType, salaryRange, setFilters]);

  // Salary slider dragging
  useEffect(() => {
    // Inside your Filters component, replace the handleMouseMove function in the useEffect with this:

    const handleMouseMove = (e) => {
      if (!activeThumb || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.min(Math.max(x / rect.width, 0), 1);

      // Calculate value and round to nearest 5000
      let clampedValue = Math.round((percentage * 80000) / 5000) * 5000;
      clampedValue = Math.min(Math.max(clampedValue, 0), 80000);

      if (activeThumb === "min") {
        const newMin = Math.min(clampedValue, salaryRange[1]);
        setSalaryRange([newMin, salaryRange[1]]);
      } else if (activeThumb === "max") {
        const newMax = Math.max(clampedValue, salaryRange[0]);
        setSalaryRange([salaryRange[0], newMax]);
      }
    };
    const handleMouseUp = () => setActiveThumb(null);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeThumb, salaryRange]);

  const minPosition = (salaryRange[0] / 80000) * 100;
  const maxPosition = (salaryRange[1] / 80000) * 100;

  return (
    <div className="bg-white mx-auto w-full max-w-7xl mt-6 p-8 rounded-md shadow-md flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
      {/* Search Input */}
      <div className="flex items-center gap-3 w-full md:w-[25%] pl-4">
        <FaSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="outline-none w-full text-gray-700 placeholder-gray-400 text-sm bg-transparent cursor-pointer"
        />
      </div>

      <div className="hidden md:block h-10 border-l border-gray-300"></div>

      {/* Location Dropdown */}
      <div className="flex items-center gap-3 w-full md:w-[20%] pl-4">
        <FaMapMarkerAlt className="text-gray-400 cursor-pointer" size={18} />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="outline-none w-full text-gray-700 bg-transparent text-sm  cursor-pointer"
        >
          <option value="Preferred Location">Preferred Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      <div className="hidden md:block h-10 border-l border-gray-300"></div>

      {/* Job Type Dropdown */}
      <div className="flex items-center gap-3 w-full md:w-[20%] pl-4">
        <FaUser className="text-gray-400" size={18} />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="outline-none w-full text-gray-700 bg-transparent text-sm  cursor-pointer"
        >
          <option value="Job Type">Job Type</option>
          <option value="FullTime">Full-Time</option>
          <option value="PartTime">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="hidden md:block h-10 border-l border-gray-300"></div>

      {/* Salary Range */}
      <div className="flex flex-col w-full md:w-[30%] pl-4">
        <div className="flex justify-between text-xs font-medium text-gray-600 mb-2">
          <span>Salary Per Month</span>
          <span>
            ₹{salaryRange[0].toLocaleString()} - ₹
            {salaryRange[1].toLocaleString()}
          </span>
        </div>

        <div ref={sliderRef} className="relative h-8 w-full cursor-pointer">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded-full -translate-y-1/2"></div>

          <div
            className="absolute top-1/2 h-1 bg-black rounded-full -translate-y-1/2"
            style={{
              left: `${minPosition}%`,
              right: `${100 - maxPosition}%`,
            }}
          ></div>

          <div
            className="absolute top-1/2 w-4 h-4 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${minPosition}%` }}
            onMouseDown={() => setActiveThumb("min")}
          ></div>

          <div
            className="absolute top-1/2 w-4 h-4 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${maxPosition}%` }}
            onMouseDown={() => setActiveThumb("max")}
          ></div>
        </div>
      </div>
    </div>
  );
}
