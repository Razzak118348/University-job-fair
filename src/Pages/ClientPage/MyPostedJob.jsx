import { useEffect, useState } from 'react';
import UseAuth from '../../Hook/UseAuth';
import axios from 'axios';
import Loading from '../../Components/Loading';
import { Link } from 'react-router-dom';

const MyPostedJob = () => {
    const [loading, setLoading] = useState(true);
    const { user } = UseAuth();
    const email = user?.email;
    const [myPostedJob, setMyPostedJob] = useState([]);

    useEffect(() => {
        const fetchPostedJobs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://job-portal-server-ruby-two.vercel.app/jobs/${email}`);
                setMyPostedJob(response.data);
            } catch (error) {
                console.error('Error fetching posted jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchPostedJobs();
        }
    }, [email]);

    const handleDeleteJob = async (jobId) => {
        try {
            await axios.delete(`https://job-portal-server-ruby-two.vercel.app/jobs/${jobId}`);
            setMyPostedJob(prev => prev.filter(job => job._id !== jobId));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const [applicantsMap, setApplicantsMap] = useState({});

    const fetchApplicants = async (jobId) => {
        try {
            const response = await axios.get(`https://job-portal-server-ruby-two.vercel.app/jobApplications/job/${jobId}`);
            setApplicantsMap(prev => ({ ...prev, [jobId]: response.data }));
        } catch (error) {
            console.error(`Error fetching applicants for job ${jobId}:`, error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">My Posted Jobs</h2>
            {loading ? (
                <Loading />
            ) : (
                <div className="grid gap-6">
                    {myPostedJob.map((job) => (
                        <div key={job._id} className="bg-white shadow-xl rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

                            {/* Job Info */}
                            <div className="col-span-1 space-y-2">
                                <h3 className="text-xl font-semibold">{job.title}</h3>
                                <p className="text-sm text-gray-500">{job.description}</p>
                                <p className="text-sm"><strong>Skills:</strong> {job.skills}</p>
                                <p className="text-sm"><strong>Salary:</strong> ${job.salary}</p>
                                <p className="text-sm"><strong>Location:</strong> {job.location}</p>
                                <p className="text-sm"><strong>Experience:</strong> {job.experience} year(s)</p>
                                <p className="text-sm"><strong>Type:</strong> {job.jobType}</p>
                                <button
                                    onClick={() => handleDeleteJob(job._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 mt-3 rounded-lg"
                                >
                                    Delete Job
                                </button>
                            </div>

                            {/* Applicant Load Button */}
                            <div className="col-span-1 flex flex-col items-start justify-start">
                                <button
                                    onClick={() => fetchApplicants(job._id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-2"
                                >
                                    {applicantsMap[job._id] ? 'Refresh Applicants' : 'View Applicants'}
                                </button>
                            </div>

                            {/* Applicants List */}
                            <div className="col-span-1 max-h-64 overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                                {applicantsMap[job._id]?.length > 0 ? (
                                    applicantsMap[job._id].map((applicant) => (
                                        <div
                                            key={applicant._id}
                                            className="bg-white p-3 rounded-lg shadow-md flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-semibold">{applicant.name || 'Applicant'}</p>
                                                <p className="text-sm text-gray-500">{applicant.email}</p>
                                            </div>
                                            <Link
                                                to={`/applicantProfile?email=${applicant.email}`}
                                                className="text-blue-500 underline text-sm"
                                            >
                                                View Profile
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No applicants yet.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPostedJob;
