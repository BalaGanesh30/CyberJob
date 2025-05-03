import React from "react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { LuUserPlus, LuLayers } from "react-icons/lu";

const JobCard = ({
  companyLogo,
  jobTitle,
  experience,
  location,
  salary,
  postedTime,
  description = [],
}) => {
  // Show only first 3 lines; show "…extra description" if more
  const maxVisibleLines = 3;
  const visibleDescription = description.slice(0, maxVisibleLines);
  const hasMore = description.length > maxVisibleLines;

  return (
    <div className="w-[270px] h-[320px] bg-white rounded-2xl shadow-md p-4 flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <img
          src={companyLogo}
          alt="Company Logo"
          className="w-14 h-14 object-contain"
        />
        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-lg">
          {postedTime}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
        {jobTitle}
      </h2>

      {/* Details */}
      <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
        <span className="flex items-center gap-1">
          <LuUserPlus /> {experience} Exp
        </span>
        <span className="flex items-center">
          <PiBuildingOfficeBold /> {location}
        </span>
        <span className="flex items-center gap-1">
          <LuLayers /> {salary}
        </span>
      </div>

      {/* Description (trimmed with extra hint) */}
      <ul className="list-disc pl-5 text-[13px] text-gray-600 flex-1 overflow-hidden">
        {visibleDescription.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
        {hasMore && (
          <li className="italic text-gray-400">...extra description</li>
        )}
      </ul>

      {/* Button pinned to bottom */}
      <div className="pt-3">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-2 rounded-lg transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
