import { useContext, useState } from 'react'
import logo from '../assets/images/logo.png'
import { AuthContext } from '../Providers/AuthProvider'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [userType, setUserType] = useState('')

    const handleUserType = (type) => {
        setUserType(type)
        console.log("User Type Changed To:", type)
    }

    const Navlink_user_seller = (
        <>
            <li>
                <div>My Bids</div>
            </li>
            <li>
                <div>Bid Requests</div>
            </li>
        </>
    )

    const Navlink_user_buyer = (
        <>
            <li>
                <div>Add Job</div>
            </li>
            <li>
                <div>My Posted Jobs</div>
            </li>
        </>
    )

    return (
        <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto fixed top-0 z-20'>
            <div className='flex-1'>
                <div className='flex gap-2 items-center'>
                    <img className='w-auto h-7' src={logo} alt='' />
                    <Link to={'/'}><span className='font-bold'>SoloSphere</span></Link>
                </div>
            </div>
            <div className='flex-none'>
                <ul className='menu menu-horizontal px-1'>
                    <Link to={'/'}>
                        <li>
                            <div>Home</div>
                        </li>
                    </Link>
                    {!user || !user?.emailVerified ? (
                        <li>
                            <Link to={'/login'}><div>Login</div></Link>
                        </li>
                    ):null}
                </ul>

                {user?.emailVerified &&
                (
                    <div className='dropdown dropdown-end z-50'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost btn-circle avatar'
                        >
                            <div title={user?.displayName} className='w-10 rounded-full'>
                                <img
                                    referrerPolicy='no-referrer'
                                    alt='User Profile Photo'
                                    src={user?.photoURL}
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            {
                                userType === '' ?
                                    (
                                        <>
                                            <li>
                                                <button className='w-full text-left py-2 px-4 hover:bg-gray-600 hover:text-white rounded-md' onClick={() => handleUserType('seller')}>
                                                    Switch to Seller Profile
                                                </button>
                                            </li>
                                            <li>
                                                <button className='w-full text-left py-2 px-4 hover:bg-gray-600 hover:text-white rounded-md' onClick={() => handleUserType('buyer')}>
                                                    Switch to Buyer Profile
                                                </button>
                                            </li>
                                        </>
                                    )

                                    :

                                    (
                                        <>
                                            {userType === 'seller' && Navlink_user_seller}
                                            {userType === 'buyer' && Navlink_user_buyer}
                                            <li className='mt-2'>
                                                <button
                                                    onClick={() => {
                                                        logOut()
                                                        setUserType('') // Reset User Type by logout
                                                    }}
                                                    className='bg-gray-200 block text-center w-full py-2 rounded-md hover:bg-gray-300'
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    )
                            }
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
