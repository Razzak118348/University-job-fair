import { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../../Hook/UseAuth";

// SweetAlert2 import
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Profile = () => {
  const { user: authUser } = UseAuth();
  const userEmail = authUser?.email;

  const [user, setUser] = useState(null); // DB data or fallback authUser
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isNewUser, setIsNewUser] = useState(false); // POST vs PATCH

  useEffect(() => {
    if (!userEmail) return;

    axios
      .get(`http://localhost:3000/profile?email=${userEmail}`)
      .then((res) => {
        if (res.data) {
          setUser(res.data);
          setFormData({
            ...res.data,
            skills: res.data.skills?.join(", ") || "",
            projects: res.data.projects?.join(", ") || "",
          });
          setIsNewUser(false);
        } else {
          // No DB data found, fallback to auth user info
          const fallback = {
            name: authUser.displayName || "",
            email: authUser.email || "",
            image: authUser.photoURL || "",
            phone: "",
            gender: "",
            address: "",
            about: "",
            skills: "",
            projects: "",
            education: "",
          };
          setUser(fallback);
          setFormData(fallback);
          setIsNewUser(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [userEmail, authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare skills/projects as arrays
    const preparedData = {
      ...formData,
      skills: formData.skills ? formData.skills.split(",").map((s) => s.trim()) : [],
      projects: formData.projects ? formData.projects.split(",").map((p) => p.trim()) : [],
    };

    try {
      let res;
      if (isNewUser) {
        // Create new profile
        res = await axios.post("http://localhost:3000/profile", preparedData);
      } else {
        // Update existing profile - omit email in body to avoid conflicts
        const { email, ...dataWithoutEmail } = preparedData;
        res = await axios.patch(`http://localhost:3000/profile?email=${userEmail}`, dataWithoutEmail);
      }

      if (
        res.status === 200 ||
        res.status === 201 ||
        res.data.result?.modifiedCount > 0 ||
        res.data.result?.upsertedCount > 0 ||
        res.data.success // If your API uses some other success flag
      ) {
        // SweetAlert success message
        await MySwal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile saved successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        setUser(preparedData);
        setModalOpen(false);
        setIsNewUser(false);
      } else {
        MySwal.fire({
          icon: "info",
          title: "No changes",
          text: "No changes made or failed to save.",
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error.response || error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Error saving profile. Please try again.",
      });
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {user ? (
        <div className="space-y-6 bg-white p-6 rounded shadow-md">
          <div className="flex items-center space-x-6">
            <img
              src={user.image || authUser?.photoURL}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover"
            />
            <div>
              <h2 className="text-3xl font-bold">{user.name || authUser?.displayName}</h2>
              <p className="text-gray-600">{user.email || authUser?.email}</p>
              <p className="mt-1 text-sm text-gray-500">{user.gender || "Gender not specified"}</p>
            </div>
          </div>

          <div className="space-y-3">
            {user.about && (
              <>
                <h3 className="text-xl font-semibold">About</h3>
                <p className="text-gray-700 whitespace-pre-line">{user.about}</p>
              </>
            )}

            {user.skills?.length > 0 && (
              <>
                <h3 className="text-xl font-semibold">Skills</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {user.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </>
            )}

            {user.education && (
              <>
                <h3 className="text-xl font-semibold">Education</h3>
                <p className="text-gray-700">{user.education}</p>
              </>
            )}

            {user.phone && (
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            )}

            {user.address && (
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            )}

            {user.projects?.length > 0 && (
              <>
                <h3 className="text-xl font-semibold">Projects</h3>
                <ul className="list-disc list-inside text-blue-600 underline">
                  {user.projects.map((link, i) => (
                    <li key={i}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
          >
            {isNewUser ? "Create Profile" : "Update Profile"}
          </button>
        </div>
      ) : (
        <p className="text-center">Loading profile...</p>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-lg relative overflow-auto max-h-[90vh]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {isNewUser ? "Create" : "Update"} Your Profile
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                disabled // Usually don't allow editing email if used as ID
              />
              <input
                name="image"
                placeholder="Profile Image URL"
                value={formData.image || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <input
                name="address"
                placeholder="Address"
                value={formData.address || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="about"
                placeholder="About Yourself"
                value={formData.about || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="4"
              />
              <input
                name="skills"
                placeholder="Skills (comma separated)"
                value={formData.skills || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                name="projects"
                placeholder="Project Links (comma separated)"
                value={formData.projects || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                name="education"
                placeholder="Education"
                value={formData.education || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold transition"
              >
                {isNewUser ? "Create" : "Update"} Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
