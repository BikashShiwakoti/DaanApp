import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dummyProfile from '../profile.png';

const Edit = () => {
    const navigate = useNavigate();
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type && file.type.startsWith('image/')) {
                setError('');
                setProfile(file);
            } else {
                setError("Selected file is not an image. Select an image!");
            }
        }
    };

    const handleUserProfile = async (e) => {
        e.preventDefault();

        try {
            if (profile && contactNumber && address) {
                if (contactNumber.length === 10) {
                    const formData = new FormData();
                    formData.append('profileImage', profile);
                    formData.append('contactNumber', contactNumber);
                    formData.append('address', address);

                    const response = await fetch('http://localhost:4000/saveUserProfile', {
                        method: 'PUT',
                        headers: {
                            'authorization': 'Bearer ' + accessToken
                        },
                        body: formData
                    });

                    if (!response.ok) {
                        console.log('Cannot save');
                        throw new Error('Failed to save profile');
                    }
                    setError('');
                    navigate('/profile');
                    console.log('Profile saved successfully!');
                } else {
                    setError('Enter a valid number');
                }
            } else {
                setError('All fields must be filled');
            }
        } catch (error) {
            console.error('Error saving profile:', error.message);
            setError('Failed to save profile. Please try again.');
        }
    };

    return (
        <>
            <form className="max-w-sm mx-auto mt-9" onSubmit={handleUserProfile}>
                <div className="mb-5 flex items-center justify-center relative group">
                    <div className="relative">
                        <img
                            src={profile ? URL.createObjectURL(profile) : dummyProfile}
                            alt="dummyProfile"
                            className="rounded-full w-32 h-32 object-cover"
                        />
                        <input
                            onChange={handleProfileChange}
                            accept="image/*"
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <div className="absolute bottom-0 bg-slate-400 text-white py-1 px-3 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Upload image
                    </div>
                </div>
                <div className="text-red-600 text-center">{error}</div>

                <div className="mb-5">
                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact info:</label>
                    <input
                        type="number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="123-456-7890"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Full address"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="ml-4 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                    Back to Profile
                </button>
            </form>
        </>
    );
};

export default Edit;
