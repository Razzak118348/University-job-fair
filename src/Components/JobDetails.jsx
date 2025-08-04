import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://job-portal-server-ruby-two.vercel.app/allJobs/${id}`)
            .then(res => {
                setJob(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching job details:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10">Loading job details...</div>;
    }

    if (!job) {
        return <div className="text-center mt-10 text-red-500">Job not found.</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4 capitalize">{job.title}</h1>

            <div className="flex items-center gap-4 mb-6">
                <img
                    src={job.photoUrl}
                    alt={job.ClientName}
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-lg">{job.ClientName}</p>
                    <p className="text-sm text-gray-500">{job.email}</p>
                </div>
            </div>

            <div className="space-y-3 text-gray-800">
                <p><strong>Category:</strong> {job.category}</p>
                <p><strong>Job Type:</strong> {job.jobType}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Experience Required:</strong> {job.experience} {job.experience === "1" ? "year" : "years"}</p>
                <p><strong>Skills:</strong> {job.skills}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Posted At:</strong> {new Date(job.postedAt).toLocaleString()}</p>
                <p><strong>Description:</strong> {job.description}</p>
            </div>
        </div>
    );
};

export default JobDetails;
