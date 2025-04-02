import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Slide = ({image,text}) => {
// set userType in AuthProvider.js for using in this component or any other component
    const {userType}=useContext(AuthContext)
    return (
        <div
            className='w-full bg-center bg-cover h-[30rem]'
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                    {text}
                    </h1>
                    <br />
                    <div>
{userType === 'buyer' ? (
                        <Link to='/add_job' className='btn btn-primary text-white'>Add Job</Link>
                    ) : userType === 'seller' ? (
                        <Link to='/my_bid' className='btn btn-primary text-white'>My Bids</Link>
                    ) : (
                        <Link to='/login' className='btn btn-primary text-white'>Login</Link>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;