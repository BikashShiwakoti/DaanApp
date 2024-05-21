import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/donation.jpg';


const Navbar = () => {
  const[error, setError] = useState('');

  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear('accessToken');
    navigate('/home');
  };
  


  return (
    <div className='text-white flex items-center justify-between  h-16  bg-black '>
      <div className='flex items-center justify-center gap-2 ml-6'>
        <img className=' w-10 h-10 rounded-full' src={logo} alt='Logo' />
        <Link to="/">Donate</Link>
      </div>

      
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-center gap-4 text-xl mr-16'>
            <Link to="/dashboard" className=' hover:text-blue-400'>Home</Link>
            <Link to="/profile" className=' hover:text-blue-400' >Profile</Link>
            <Link to="/additem" className=' hover:text-blue-400'>Add items</Link>
          </div>
          <div>
            <Link to="/login">
              <button onClick={handleLogout}
                type="button"
                className="mr-6 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Log Out
              </button>
            </Link>
          </div>
        </div>
    </div >
  );
};

export default Navbar;
