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
  description,
}) => {
  return (
    <div className="w-[270px] bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
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
      <h2 className="text-lg font-semibold text-gray-800 m-0">{jobTitle}</h2>

      {/* Details */}
      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
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

      {/* Description */}
      <ul className="list-disc pl-5 text-[13px] text-gray-600 m-0 max-h-24 overflow-hidden">
        {description.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>

      {/* Button */}
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-2 rounded-lg transition mt-2 cursor-pointer">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
