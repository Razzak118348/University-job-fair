import { useEffect, useState } from 'react';
import axios from 'axios';
import UseAuth from '../../Hook/UseAuth';
import { Link } from 'react-router-dom';

const Mybid = () => {
    const { user } = UseAuth();
    const [myBids, setMyBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://job-portal-server-ruby-two.vercel.app/jobApplications/${user.email}`)
                .then(res => {
                    setMyBids(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    if (loading) {
        return <div className="text-center mt-10 text-lg animate-pulse">Loading your bids...</div>;
    }

    if (myBids.length === 0) {
        return <div className="text-center mt-10 text-red-500">No jobs applied yet.</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">My Applied Jobs</h2>
            <div className="grid gap-6">
                {myBids.map((bid) => (
                    <div
                        key={bid._id}
                        className="border rounded-2xl p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out animate-fade-in"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-start gap-5">
                                <img
                                    src={bid.image}
                                    alt={bid.name}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                                />
                                <div className="text-gray-700 space-y-1">
                                    <h3 className="text-xl font-semibold text-gray-800">{bid.name}</h3>
                                    <p><span className="font-medium">Age:</span> {bid.age}</p>
                                    <p><span className="font-medium">Email:</span> {bid.email}</p>
                                    <p><span className="font-medium">Education:</span> {bid.education}</p>
                                    <p><span className="font-medium">Skills:</span> {bid.skills}</p>
                                    <p><span className="font-medium">Experience:</span> {bid.experienceDetails}</p>
                                    <p><span className="font-medium">Address:</span> {bid.address}</p>
                                    <a
                                        href={bid.resumeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline hover:text-blue-800 transition"
                                    >
                                        View Resume
                                    </a>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Link to={`/jobs/${bid.jobId}`}>
                                    <button className="px-2 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">
                                        View Job
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mybid;
