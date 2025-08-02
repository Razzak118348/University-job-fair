import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import UseAuth from '../../Hook/UseAuth';

const AddJob = () => {
    const {user}=UseAuth()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log("Submitting job data:", data);
            const response = await axios.post('http://localhost:3000/jobs', data);
            if (response.data?.insertedId || response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Job Posted Successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset(); // Reset form after successful post
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to post job',
                text: error.message,
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Post a Job</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-semibold">Your Name</label>
                    <input
                        {...register('ClientName', { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. Sabbir Ahmed"
                        defaultValue={user?.displayName || ''}
                    />
                    {errors.ClientName && <p className="text-red-500 text-sm">Your Name is required</p>}
                </div>
                <div>
                    <label className="block font-semibold">Photo URL</label>
                    <input
                        {...register('photoUrl', { required: true })}
                        className="w-full border p-2 rounded"
                        defaultValue={user?.photoURL || ''}

                    />
                    {errors.photoUrl && <p className="text-red-500 text-sm">Photo URL is required</p>}
                </div>
                <div>
                    <input  {...register('email', { required: true })} hidden value={user.email} />
                </div>
                <div>
                    <label className="block font-semibold">Job Title</label>
                    <input
                        {...register('title', { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. Frontend Developer"
                    />
                    {errors.title && <p className="text-red-500 text-sm">Job Title is required</p>}
                </div>

                <div>
                    <label className="block font-semibold">Job Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="Write job responsibilities and expectations"
                        rows={4}
                    />
                    {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                </div>

                <div>
                    <label className="block font-semibold">Experience Required</label>
                    <input
                        {...register('experience', { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. 2+ years"
                    />
                    {errors.experience && <p className="text-red-500 text-sm">Experience is required</p>}
                </div>

                <div>
                    <label className="block font-semibold">Job Type</label>
                    <select
                        {...register('jobType', { required: true })}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Job Type</option>
                        <option value="remote">Remote</option>
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                    {errors.jobType && <p className="text-red-500 text-sm">Job Type is required</p>}
                </div>
                <div>
    <label className="block font-semibold">Category</label>
    <select
        {...register('category', { required: true })}
        className="w-full border p-2 rounded"
    >
        <option value="">Select Job Category</option>
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
    {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
</div>

                <div>
                    <label className="block font-semibold">Salary Range</label>
                    <input
                        {...register('salary')}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. $3000 - $5000"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Location</label>
                    <input
                        {...register('location')}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. Dhaka, Bangladesh"
                    />
                    {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
                </div>

                <div>
                    <label className="block font-semibold">Job Post Time</label>
                    <input
                        {...register('postedAt')}
                        className="w-full border p-2 rounded"
                        type="datetime-local"
                    />
                    {errors.postedAt && <p className="text-red-500 text-sm">Job Post Time is required</p>}
                </div>

                <div>
                    <label className="block font-semibold">Skills Required (comma separated)</label>
                    <input
                        {...register('skills')}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. React, Node.js, MongoDB"
                    />
                </div>

                {/* <div>
                    <label className="block font-semibold">Apply Link or Email</label>
                    <input
                        {...register('applyLink')}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. https://applyhere.com/job-id or careers@example.com"
                    />
                </div> */}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700"
                >
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default AddJob;
