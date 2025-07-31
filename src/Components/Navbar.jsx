import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
    const { user, logOut, userType, setUserType } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            await logOut();
            setIsOpen(false);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const toggleUserType = () => {
        const newType = userType === "buyer" ? "seller" : "buyer";
        setUserType(newType);
    };

    const linkClass = ({ isActive }) =>
        isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
            : "text-gray-700 hover:text-blue-600";

    const navItems = (
        <>
            <li>
                <NavLink to="/" onClick={() => setIsOpen(false)} className={linkClass}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/allJob" onClick={() => setIsOpen(false)} className={linkClass}>
                    All Jobs
                </NavLink>
            </li>

            {userType === "seller" && (
                <li>
                    <NavLink to="/my_bid" onClick={() => setIsOpen(false)} className={linkClass}>
                        My Bids
                    </NavLink>
                </li>
            )}

            {userType === "buyer" && (
                <>
                    <li>
                        <NavLink to="/add_job" onClick={() => setIsOpen(false)} className={linkClass}>
                            Add Job
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my_posted_job" onClick={() => setIsOpen(false)} className={linkClass}>
                            My Posted Jobs
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <nav className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                <Link to="/" className="text-base md:text-lg lg:text-xl font-bold text-blue-600">HSTU Job Portal</Link>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <ul className="flex items-center space-x-4">{navItems}</ul>

                    {user?.emailVerified ? (
                        <div className="flex items-center gap-4 relative">
                            <button
                                onClick={toggleUserType}
                                className="px-3 py-1 text-sm  text-white rounded bg-blue-500 hover:bg-blue-600"
                            >
                                Switch to {userType === "buyer" ? "Seller" : "Buyer"}
                            </button>

                            {/* Dropdown */}
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div
                                        className="w-10 h-10 rounded-full border-2 border-blue-600 shadow-sm"
                                        title={user?.displayName || "User name not found"}
                                    >
                                        <img
                                            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/219/219986.png"}
                                            alt="user"
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content mt-3 z-[1000] p-3 shadow-md bg-white dark:bg-gray-800 rounded-box w-48 space-y-2"
                                >
                                    <li className="text-gray-700 dark:text-white font-semibold text-sm">
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-left px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                        >
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full px-4 py-2 text-sm text-red-600 text-left hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="space-x-2">
                            <Link to="/login" className="px-4 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-100">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-1 bg-blue-400 text-white rounded hover:bg-blue-600">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-2xl text-gray-700">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t shadow-sm px-4 py-3">
                    <ul className="space-y-3">{navItems}</ul>

                    {user?.emailVerified ? (
                        <div className="mt-4 space-y-3">
                            <button
                                onClick={toggleUserType}
                                className="block w-full text-left hover:py-2 hover:text-white  text-gray-800 rounded hover:bg-blue-600"
                            >
                                Switch to {userType === "buyer" ? "Seller" : "Buyer"}
                            </button>
                            <div className="flex items-center gap-3 mt-2">
                                <img
                                    src={user.photoURL || "/default-avatar.png"}
                                    alt="User"
                                    className="h-12 w-12 rounded-full border border-gray-300 object-cover"
                                />
                            </div>
                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-left px-4 py-2 text-gray-800 rounded hover:bg-gray-300"
                            >
                                My Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full px-4 py-2 text-sm text-red-600 text-left hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4 space-y-2">
                            <Link to="/login" className="block w-full text-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100">
                                Login
                            </Link>
                            <Link to="/register" className="block w-full text-center px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
