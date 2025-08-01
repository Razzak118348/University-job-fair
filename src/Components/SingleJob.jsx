import React from 'react';

const SingleJob = ({ job }) => {
  return (
    <div className=" p-6 rounded  hover:shadow-lg transition duration-300 space-y-4">
      {/* Title and Profile Picture */}
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-2xl font-semibold text-blue-600">{job.title}</h3>

        {/* Hoverable Image with Tooltip */}
        <div className="relative group">
          <img
            className="w-16 h-12 rounded-full border"
            src={job.photoUrl}
            alt="Recruiter"
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
            Recruiter: {job.ClientName}
          </div>
        </div>
      </div>
      {/* Job Details */}
      <div className="space-y-1 text-gray-700 text-sm">
        <p><span className="font-semibold">Category:</span> {job.category}</p>
        <p><span className="font-semibold">Type:</span> {job.jobType}</p>
        <p><span className="font-semibold">Experience:</span> {job.experience} year(s)</p>
        <p><span className="font-semibold">Salary:</span> ${job.salary}</p>
        <p><span className="font-semibold">Location:</span> {job.location}</p>
        <p><span className="font-semibold">Posted At:</span> {new Date(job.postedAt).toLocaleDateString()}</p>
        <p><span className="font-semibold">Skills Require:</span> <span className="text-blue-500">{job.skills}</span></p>
      </div>

      {/* Job Description */}
      <p className="text-gray-700 text-sm">
        <span className="font-semibold">Description:</span> {job.description.slice(0, 200)}...
      </p>
    </div>
  );
};

export default SingleJob;
