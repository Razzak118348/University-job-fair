import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Admin = () => {
    const loadedUsers = useLoaderData();
    console.log(loadedUsers);
    const [users, setUsers] = useState(loadedUsers);

    // Handle delete user
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
            await  axios.delete(`https://job-portal-server-ruby-two.vercel.app/profile/${id}`)

                // Update UI
                setUsers(users.filter((user) => user._id !== id));

                Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success",
                });
            } catch (error) {
                console.error(error);
                Swal.fire("Error!", "Failed to delete user.", "error");
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Admin Panel - Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Image</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Phone</th>
                            <th className="p-3 border">Gender</th>
                            <th className="p-3 border">Address</th>
                            <th className="p-3 border">Education</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center">
                                <td className="p-3 border">
                                    <img
                                        src={user.image || "https://via.placeholder.com/50"}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full mx-auto"
                                    />
                                </td>
                                <td className="p-3 border">{user.name}</td>
                                <td className="p-3 border">{user.email}</td>
                                <td className="p-3 border">{user.phone}</td>
                                <td className="p-3 border">{user.gender}</td>
                                <td className="p-3 border">{user.address}</td>
                                <td className="p-3 border">{user.education}</td>
                                <td className="p-3 border">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center p-4 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
