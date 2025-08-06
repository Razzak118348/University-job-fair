// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Swal from 'sweetalert2';
// import { useForm } from 'react-hook-form';
// import SingleJob from '../../Components/SingleJob';
// import useUserData from '../../Hook/useUserData';
// import Loading from '../../Components/Loading';
// import axios from 'axios';

// const AllJob = () => {
//   const [allJobs, setAllJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const user = useUserData();

//   const fetchJobs = async (page) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://job-portal-server-ruby-two.vercel.app/jobs?page=${page}&limit=9`);
//       const data = await response.json();
//       setAllJobs(data.jobs);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load jobs. Please try again later.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs(currentPage);
//   }, [currentPage]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const openModal = (job) => {
//     if (!user) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Oops!',
//         text: 'Please complete your profile before applying for jobs.',
//       });
//       return;
//     }
//     setSelectedJob(job);
//     setShowModal(true);
//   };

// const onSubmit = async (data) => {
//   try {
//     const payload = {
//       ...data,
//       jobId: selectedJob._id,
//       userId: user._id,
//     };
// console.log('Submitting application:', payload);
//     // Send application data to the server
//     await axios.post(
//       `https://job-portal-server-ruby-two.vercel.app/jobApplications/${user.email}` ,
//       payload
//     );

//     Swal.fire({
//       title: 'Success!',
//       text: 'Your application has been submitted.',
//       icon: 'success',
//       confirmButtonText: 'Cool',
//     });

//     reset();
//     setShowModal(false);
//   } catch (error) {
//     console.error('Error submitting application:', error);
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'Failed to submit application. Please try again later.',
//     });
//   }
// };

//   return (
//     <div className="p-4 md:p-8 max-w-full mx-auto bg-gradient-to-br from-blue-50 to-white min-h-screen">
//       <h2 className="text-lg md:text-lg lg:text-2xl font-bold text-center mb-6 text-blue-700 drop-shadow-lg">
//         All Job Posts
//       </h2>

//       {loading ? (
//         <div className="flex items-center justify-center min-h-screen w-full">
//           <Loading />
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {allJobs?.map((job) => (
//               <motion.div
//                 key={job._id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.1 }}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-3 border border-blue-100"
//               >
//                 <SingleJob job={job} />
//                 <div className="mt-5 flex justify-end">
//                   <button
//                     onClick={() => openModal(job)}
//                     className="bg-gradient-to-r text-sm from-blue-500 to-blue-700 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transform transition"
//                   >
//                     Apply Now
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center mt-10 space-x-2">
//             {[...Array(totalPages).keys()].map((page) => (
//               <button
//                 key={page + 1}
//                 onClick={() => setCurrentPage(page + 1)}
//                 className={`px-4 py-2 rounded-full ${
//                   currentPage === page + 1
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 {page + 1}
//               </button>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Application Modal */}
//       {showModal && selectedJob && user && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
//           <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
//             >
//               ✖
//             </button>
//             <h2 className="text-2xl font-bold text-blue-600 mb-4">Apply for: {selectedJob.title}</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <input type="hidden" value={selectedJob._id} {...register('jobId')} />

//               <div>
//                 <label className="block font-semibold">Your Name</label>
//                 <input
//                   {...register('name', { required: true })}
//                   className="w-full border p-2 rounded"
//                   defaultValue={user?.name || ''}
//                 />
//                 {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
//               </div>

//               <div>
//                 <label className="block font-semibold">Email</label>
//                 <input
//                   {...register('email', { required: true })}
//                   type="email"
//                   className="w-full border p-2 rounded"
//                   defaultValue={user?.email || ''}
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
//               </div>

//               <div>
//                 <label className="block font-semibold">Skills</label>
//                 <input
//                   {...register('skills', { required: true })}
//                   className="w-full border p-2 rounded"
//                   defaultValue={user?.skills || ''}
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold">Experience Details</label>
//                 <textarea
//                   {...register('experienceDetails')}
//                   rows="2"
//                   className="w-full border p-2 rounded"
//                   defaultValue={user?.experienceDetails || ''}
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold">Resume Link</label>
//                 <input
//                   {...register('resumeLink', { required: true })}
//                   className="w-full border p-2 rounded"
//                 />
//                 {errors.resumeLink && <p className="text-red-500 text-sm">Resume link is required</p>}
//               </div>

//               <div>
//                 <label className="block font-semibold">Age</label>
//                 <input
//                   type="number"
//                   {...register('age')}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold">Image URL</label>
//                 <input
//                   {...register('image')}
//                   className="w-full border p-2 rounded"
//                   defaultValue={user?.image || ''}
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold">Education</label>
//                 <input
//                   {...register('education', { required: true })}
//                   className="w-full border p-2 rounded"
//                   defaultValue={user?.education || ''}
//                 />
//                 {errors.education && <p className="text-red-500 text-sm">Education is required</p>}
//               </div>

//               <div>
//                 <label className="block font-semibold">Address</label>
//                 <input
//                   {...register('address', { required: true })}
//                   className="w-full border p-2 rounded"
//                   defaultValue={user?.address || ''}
//                 />
//                 {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
//               </div>

//               <button
//                 type="submit"
//                 className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
//               >
//                 Submit Application
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllJob;


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import SingleJob from '../../Components/SingleJob';
import useUserData from '../../Hook/useUserData';
import Loading from '../../Components/Loading';
import axios from 'axios';

const AllJob = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState(""); // NEW: category state

  const user = useUserData();

  const fetchJobs = async (page, selectedCategory) => {
    setLoading(true);
    try {
      let url = `https://job-portal-server-ruby-two.vercel.app/jobs?page=${page}&limit=9`;
      if (selectedCategory && selectedCategory !== "all") {
        url += `&category=${selectedCategory}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setAllJobs(data.jobs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load jobs. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(currentPage, category);
  }, [currentPage, category]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const openModal = (job) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please complete your profile before applying for jobs.',
      });
      return;
    }
    setSelectedJob(job);
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        jobId: selectedJob._id,
        userId: user._id,
      };
      console.log('Submitting application:', payload);

      await axios.post(
        `https://job-portal-server-ruby-two.vercel.app/jobApplications/${user.email}`,
        payload
      );

      Swal.fire({
        title: 'Success!',
        text: 'Your application has been submitted.',
        icon: 'success',
        confirmButtonText: 'Cool',
      });

      reset();
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit application. Please try again later.',
      });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-full mx-auto bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h2 className="text-lg md:text-lg lg:text-2xl font-bold text-center mb-6 text-blue-700 drop-shadow-lg">
        All Job Posts
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center mb-6">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1); // Reset to first page when category changes
          }}
          className="border border-gray-300 p-2 rounded-md shadow-sm"
        >
          <option value="all">All Categories</option>
          <option value="frontend_development">Frontend Development</option>
          <option value="backend_development">Backend Development</option>
          <option value="fullstack_development">Fullstack Development</option>
          <option value="web_development">Web Development</option>
          <option value="mobile_app_development">Mobile App Development</option>
          <option value="graphic_design">Graphic Design</option>
          <option value="ui_ux_design">UI/UX Design</option>
          <option value="digital_marketing">Digital Marketing</option>
          <option value="seo">SEO</option>
          <option value="content_writing">Content Writing</option>
          <option value="tuition">Tuition</option>
          <option value="data_entry">Data Entry</option>
          <option value="virtual_assistant">Virtual Assistant</option>
          <option value="video_editing">Video Editing</option>
          <option value="animation">Animation</option>
          <option value="software_testing">Software Testing</option>
          <option value="cyber_security">Cyber Security</option>
          <option value="network_administration">Network Administration</option>
          <option value="machine_learning">Machine Learning</option>
          <option value="ai_development">AI Development</option>
          <option value="game_development">Game Development</option>
          <option value="blockchain">Blockchain</option>
          <option value="devops">DevOps</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allJobs?.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-3 border border-blue-100"
              >
                <SingleJob job={job} />
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={() => openModal(job)}
                    className="bg-gradient-to-r text-sm from-blue-500 to-blue-700 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transform transition"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-2">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => setCurrentPage(page + 1)}
                className={`px-4 py-2 rounded-full ${
                  currentPage === page + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Application Modal */}
      {showModal && selectedJob && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Apply for: {selectedJob.title}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" value={selectedJob._id} {...register('jobId')} />

              <div>
                <label className="block font-semibold">Your Name</label>
                <input
                  {...register('name', { required: true })}
                  className="w-full border p-2 rounded"
                  defaultValue={user?.name || ''}
                />
                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
              </div>

              <div>
                <label className="block font-semibold">Email</label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="w-full border p-2 rounded"
                  defaultValue={user?.email || ''}
                />
                {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
              </div>

              <div>
                <label className="block font-semibold">Skills</label>
                <input
                  {...register('skills', { required: true })}
                  className="w-full border p-2 rounded"
                  defaultValue={user?.skills || ''}
                />
              </div>

              <div>
                <label className="block font-semibold">Experience Details</label>
                <textarea
                  {...register('experienceDetails')}
                  rows="2"
                  className="w-full border p-2 rounded"
                  defaultValue={user?.experienceDetails || ''}
                />
              </div>

              <div>
                <label className="block font-semibold">Resume Link</label>
                <input
                  {...register('resumeLink', { required: true })}
                  className="w-full border p-2 rounded"
                />
                {errors.resumeLink && <p className="text-red-500 text-sm">Resume link is required</p>}
              </div>

              <div>
                <label className="block font-semibold">Age</label>
                <input
                  type="number"
                  {...register('age')}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold">Image URL</label>
                <input
                  {...register('image')}
                  className="w-full border p-2 rounded"
                  defaultValue={user?.image || ''}
                />
              </div>

              <div>
                <label className="block font-semibold">Education</label>
                <input
                  {...register('education', { required: true })}
                  className="w-full border p-2 rounded"
                  defaultValue={user?.education || ''}
                />
                {errors.education && <p className="text-red-500 text-sm">Education is required</p>}
              </div>

              <div>
                <label className="block font-semibold">Address</label>
                <input
                  {...register('address', { required: true })}
                  className="w-full border p-2 rounded"
                  defaultValue={user?.address || ''}
                />
                {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllJob;
