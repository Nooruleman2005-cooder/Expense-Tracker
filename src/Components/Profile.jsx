import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseconfig.js'; 
import profile from '../assets/img/logopng.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login"); 
    } else {
      setUser({
        name: currentUser.displayName || 'Anonymous User',
        email: currentUser.email,
        photo: currentUser.photoURL || profile,
      });
    }
  }, [navigate]);


  if (!user) return <p className="text-center mt-50">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-50 p-6 bg-white shadow-xl rounded-2xl text-center">
      <img
        className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
        src={user.photo}
        alt="Profile"
      />
      <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <div className='mt-5 '>
      <Link to={'/home'} >Go To Transactions</Link></div>
    </div>
  );
};

export default Profile;
