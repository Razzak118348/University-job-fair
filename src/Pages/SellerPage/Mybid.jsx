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
            axios.get(`http://localhost:3000/jobApplications/${user.email}`)
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
        return <div className="text-center mt-10 text-lg">Loading your bids...</div>;
    }

    if (myBids.length === 0) {
        return <div className="text-center mt-10 text-red-500">No jobs applied yet.</div>;
    }

    console.log('My Bids:', myBids);
    return (
        <div className="p-5 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">My Applied Jobs</h2>
            <div className="grid gap-4">
                {myBids.map((bid) => (
                    <div key={bid._id} className="border rounded-xl p-5 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center bg-white">
                        <div className="flex items-center gap-4">
                            <img
                                src={bid.image}
                                alt={bid.name}
                                className="w-16 h-16 rounded-full object-cover border"
                            />
                            <div>
                                <h3 className="text-xl font-semibold">{bid.name}</h3>
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
                                    className="text-blue-600 underline mt-1 inline-block"
                                >
                                    View Resume
                                </a>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                        <Link to={`/jobs/${bid.jobId}`}>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
    View Job
  </button>
</Link>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mybid;
