// src/Hooks/useUserData.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import UseAuth from './UseAuth';


const useUserData = () => {
  const { user: userAuth } = UseAuth();
  const userEmail = userAuth?.email;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`http://localhost:3000/profile?email=${userEmail}`)
        .then((res) => {
          if (res.data) {
            setUser(res.data);
          } else {
            setUser(null);
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [userEmail]);
// console.log("User data fetched:", user);
  return  user;
};

export default useUserData;
