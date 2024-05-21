import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../profile.png';
import Navbar from './Navbar';

const Profile = () => {
  const [PhotoData, setPhotoData] = useState(null);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const profileDataResponse = await fetch('http://localhost:4000/getprofiledata', {
          method: 'GET',
          headers: {
            'Authorization': "Bearer " + accessToken
          }
        });

        if (!profileDataResponse.ok) {
          console.log('could not fetch')
        }

        const profileData = await profileDataResponse.json();
        console.log(profileData);
        setPhotoData(profileData.profileImageData)
        setName(profileData.username);
        setContactNumber(profileData.contactNumber);
        setAddress(profileData.address);
      } catch (error) {
        setError(error.message || "An error occurred while fetching profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate, accessToken]);

  return (
    <>
      <Navbar />
      <p>Profile</p>
      {loading && <p>Loading...</p>}
    
        <div className='flex justify-start items-start flex-col ml-9 mt-10 gap-4'>
          <div>
          <img src={PhotoData ? `data:${PhotoData.contentType};base64,${PhotoData.data}`: profile} alt='profile pic' className='w-50 h-64'/>

          </div>
          <div>
            Name: {name? name :''}
          </div>
          <div>
            Contact Number: {contactNumber? contactNumber:''}
          </div>
          <div>
            Address: {address? address:''}
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate('/edit')}
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Edit
            </button>
          </div>
        </div>
      
    </>
  );
}

export default Profile;
