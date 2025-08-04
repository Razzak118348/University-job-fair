// src/components/ApplicantProfile.jsx

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Import icons for a professional look
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserGraduate, FaBriefcase, FaCode, FaCog } from 'react-icons/fa';

// A small helper component for section titles to keep code DRY (Don't Repeat Yourself)
const Section = ({ title, icon, children }) => (
    <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            {icon}
            {title}
        </h2>
        <hr className="mt-2 mb-4 border-t-2 border-gray-200" />
        <div className="text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);


const ApplicantProfile = () => {
    const [searchParams] = useSearchParams();
    const userEmail = searchParams.get('email');
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userEmail) {
            setLoading(true);
            axios.get(`https://job-portal-server-ruby-two.vercel.app/profile?email=${userEmail}`)
                .then(res => {
                    if (res.data) {
                        setProfileData(res.data);
                    } else {
                        setError('No profile data found for this email.');
                    }
                })
                .catch(err => {
                    console.error('Error fetching profile data:', err);
                    setError('Failed to fetch profile data.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userEmail]);

    if (loading) {
        return <div className="text-center p-10">Loading profile...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    if (!profileData) {
        return <div className="text-center p-10">No profile to display.</div>;
    }

    return (
        <div className="bg-gray-100 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
                {/* --- HEADER SECTION --- */}
                <header className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b">
                    <img
                        src={profileData.image || 'https://via.placeholder.com/150'} // Fallback image
                        alt="Profile Picture"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
                    />
                    <div className="text-center sm:text-left">
                        <h1 className="text-4xl font-extrabold text-gray-900">{profileData.name}</h1>
                        <p className="text-lg text-gray-600 mt-1">{profileData.education}</p>
                        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                                <FaEnvelope className="text-blue-500" />
                                {profileData.email}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaPhone className="text-blue-500" />
                                {profileData.phone}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-blue-500" />
                                {profileData.address}
                            </span>
                        </div>
                    </div>
                </header>

                {/* --- MAIN CONTENT (2-COLUMN) --- */}
                <main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-2">
                        {profileData.about && (
                            <Section title="About Me" icon={<FaUserGraduate />}>
                                <p>{profileData.about}</p>
                            </Section>
                        )}

                        {profileData.experienceDetails && (
                            <Section title="Experience" icon={<FaBriefcase />}>
                                <p>{profileData.experienceDetails}</p>
                            </Section>
                        )}

                        <Section title="Projects" icon={<FaCog />}>
                            {profileData.projects && profileData.projects.length > 0 ? (
                                <ul>
                                    {profileData.projects.map((project, index) => (
                                        <li key={index} className="mb-2 list-disc ml-5">{project}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic">No projects listed.</p>
                            )}
                        </Section>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="md:col-span-1">
                        <Section title="Skills" icon={<FaCode />}>
                            <div className="flex flex-wrap gap-2">
                                {profileData.skills && profileData.skills.length > 0 ? (
                                    profileData.skills.map((skill, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No skills listed.</p>
                                )}
                            </div>
                        </Section>
                         {/* You can add more sections to the sidebar if needed */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ApplicantProfile;