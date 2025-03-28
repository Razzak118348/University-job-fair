import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const Root = () => {
    return (<div>

        <div>
            {/* Navbar Component */}
            <Navbar></Navbar>

            {/**outlate */}
            <div className='min-h-[calc(100vh-230px)] mt-16'>
                <Outlet></Outlet>
            </div>

            {/**Footer Component */}
            <Footer></Footer>
        </div>
    </div>
    );
};

export default Root;