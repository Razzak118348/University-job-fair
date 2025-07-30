import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const UseAuth = () => {
    const AllAuthProvider = useContext(AuthContext)
    return AllAuthProvider;
};

export default UseAuth;