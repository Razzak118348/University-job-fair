import { useEffect, useState, useRef } from "react"; // Import useRef for the dialog
import axios from "axios";
import UseAuth from "../../Hook/UseAuth";

// Icons for a professional touch
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
  FaGraduationCap, FaCog, FaCode, FaLink, FaVenusMars
} from 'react-icons/fa';

// SweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


// Helper component for styled sections
const SectionCard = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3 mb-4">
      {icon}
      <span>{title}</span>
    </h3>
    <div className="text-gray-700 space-y-4">{children}</div>
  </div>
);


const Profile = () => {
  const { user: authUser } = UseAuth();
  const userEmail = authUser?.email;

  const [user, setUser] = useState(null); // DB user data
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const dialogRef = useRef(null); // Ref for the dialog element

  // --- DATA FETCHING & STATE LOGIC (Your original logic, slightly cleaned up) ---
  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    };

    setLoading(true);
    axios
      .get(`https://job-portal-server-ruby-two.vercel.app/profile?email=${userEmail}`)
      .then((res) => {
        const dbData = res.data;
        if (dbData && Object.keys(dbData).length > 0) {
          setUser(dbData);
          setFormData({
            ...dbData,
            skills: dbData.skills?.join(", ") || "",
            projects: dbData.projects?.join(", ") || "",
          });
          setIsNewUser(false);
        } else {
          const fallback = {
            name: authUser.displayName || "", email: authUser.email || "", image: authUser.photoURL || "",
            phone: "", gender: "", address: "", about: "", skills: "", projects: "", education: "", experienceDetails: ""
          };
          setUser(fallback);
          setFormData(fallback);
          setIsNewUser(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userEmail, authUser]);


  // --- DIALOG CONTROL ---
  useEffect(() => {
    const dialog = dialogRef.current;
    if (modalOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [modalOpen]);


  // --- FORM HANDLERS (Your original logic) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preparedData = {
      ...formData,
      skills: formData.skills ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
      projects: formData.projects ? formData.projects.split(",").map((p) => p.trim()).filter(Boolean) : [],
    };

    try {
      let res;
      if (isNewUser) {
        res = await axios.post("https://job-portal-server-ruby-two.vercel.app/profile", preparedData);
      } else {
        const { email, ...dataWithoutEmail } = preparedData;
        res = await axios.patch(`https://job-portal-server-ruby-two.vercel.app/profile?email=${userEmail}`, dataWithoutEmail);
      }

      if (res.status === 200 || res.status === 201) {
        await MySwal.fire({
          icon: "success", title: "Success!", text: "Profile saved successfully.",
          timer: 2000, showConfirmButton: false,
        });
        // Refetch user data to ensure UI is perfectly in sync
        axios.get(`https://job-portal-server-ruby-two.vercel.app/profile?email=${userEmail}`).then(res => setUser(res.data));
        setModalOpen(false);
        setIsNewUser(false);
      } else {
        MySwal.fire({ icon: "info", title: "No changes", text: "No changes were saved." });
      }
    } catch (error) {
      console.error("Error saving profile:", error.response || error);
      MySwal.fire({ icon: "error", title: "Error", text: "Error saving profile. Please try again." });
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading profile...</p></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* --- PROFILE DISPLAY --- */}
        {user && (
          <div className="space-y-8">
            {/* Header Card */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg flex flex-col sm:flex-row items-center gap-6">
              <img
                src={user.image || 'https://i.ibb.co/61A0Q54/user.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{user.name}</h2>
                <p className="text-lg text-blue-600 font-medium mt-1">{user.education}</p>
                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-gray-600">
                  <span className="flex items-center gap-2"><FaEnvelope /> {user.email}</span>
                  {user.phone && <span className="flex items-center gap-2"><FaPhone /> {user.phone}</span>}
                  {user.address && <span className="flex items-center gap-2"><FaMapMarkerAlt /> {user.address}</span>}
                  {user.gender && <span className="flex items-center gap-2"><FaVenusMars /> {user.gender}</span>}
                </div>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-200 hover:scale-105"
              >
                {isNewUser ? "Create Profile" : "Update Profile"}
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {user.about && <SectionCard title="About Me" icon={<FaUser />}>
                  <p className="whitespace-pre-line">{user.about}</p>
                </SectionCard>}
                {user.experienceDetails && <SectionCard title="Experience" icon={<FaBriefcase />}>
                  <p className="whitespace-pre-line">{user.experienceDetails}</p>
                </SectionCard>}
                {user.projects && user.projects.length > 0 && <SectionCard title="Projects" icon={<FaCog />}>
                  <ul className="space-y-3">
                    {user.projects.map((link, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <FaLink className="text-blue-500" />
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </SectionCard>}
              </div>

              {/* Right Column (Sidebar) */}
              <div className="lg:col-span-1 space-y-8">
                {user.skills && user.skills.length > 0 && <SectionCard title="Skills" icon={<FaCode />}>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, i) => (
                      <span key={i} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </SectionCard>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL DIALOG for Editing Profile --- */}
      <dialog ref={dialogRef} onCancel={() => setModalOpen(false)} className="p-0 rounded-lg shadow-xl w-full max-w-2xl backdrop:bg-black backdrop:bg-opacity-50">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{isNewUser ? "Create" : "Update"} Your Profile</h3>
            <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Form fields */}
              <input name="name" placeholder="Full Name" value={formData.name || ""} onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input name="email" placeholder="Email" value={formData.email || ""} className="w-full p-3 border rounded-md bg-gray-100" required disabled />
              <input name="image" placeholder="Profile Image URL" value={formData.image || ""} onChange={handleChange} className="sm:col-span-2 w-full p-3 border rounded-md" />
              <input name="phone" placeholder="Phone Number" value={formData.phone || ""} onChange={handleChange} className="w-full p-3 border rounded-md" />
              <select name="gender" value={formData.gender || ""} onChange={handleChange} className="w-full p-3 border rounded-md">
                <option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option>
              </select>
              <input name="address" placeholder="Address" value={formData.address || ""} onChange={handleChange} className="w-full p-3 border rounded-md" />
              <input name="education" placeholder="Education (e.g., B.Sc. in CSE)" value={formData.education || ""} onChange={handleChange} className="w-full p-3 border rounded-md" />
              <textarea name="about" placeholder="About Yourself" value={formData.about || ""} onChange={handleChange} className="sm:col-span-2 w-full p-3 border rounded-md" rows="4" />
              <textarea name="experienceDetails" placeholder="Your Experience Details" value={formData.experienceDetails || ""} onChange={handleChange} className="sm:col-span-2 w-full p-3 border rounded-md" rows="4" />
              <div className="sm:col-span-2">
                <input name="skills" placeholder="Skills" value={formData.skills || ""} onChange={handleChange} className="w-full p-3 border rounded-md" />
                <small className="text-gray-500">Enter skills separated by commas (e.g., React, Node.js, MongoDB)</small>
              </div>
              <div className="sm:col-span-2">
                <input name="projects" placeholder="Project Links" value={formData.projects || ""} onChange={handleChange} className="w-full p-3 border rounded-md" />
                <small className="text-gray-500">Enter project links separated by commas</small>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition">
              Save Changes
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;