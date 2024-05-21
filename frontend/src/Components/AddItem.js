import React, { useState } from 'react';
import Navbar from './Navbar';
import dummyProfile from '../profile.png'

function PhotoUpload() {
  const [itemPhoto, setItemPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setItemPhoto(file);
    }
  };

  function sendItemData() {
    let formData = new FormData();
    formData.append('itemPhoto', itemPhoto);
    formData.append('description', description);

    fetch('http://localhost:4000/saveItemData', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer ' + accessToken
      },
      body:formData
    })
    .then(res => {
      if(res.ok){
        console.log('item added successfully');
        setItemPhoto(null);
        setDescription('');
      }
    })
    .catch(err => {
      console.log("An error occured ", err);
    })
  }



  return (
    <>
      <Navbar />
      
      <p className='text-center text-2xl font-mono mt-12'>Upload the picture of the items that you don't usebut could be useful for others amd donate them.</p>
     <form>
      <div className="mb-5 flex items-center justify-center relative group  mt-10">
        <div className="relative">
          <p className='text-center  font-bold mb-2'>Upload image here</p>
          <img
            src={itemPhoto ? URL.createObjectURL(itemPhoto) : dummyProfile}
            alt="dummyProfile"
            className="rounded w-48 h-48   object-cover"
          />
          <input
            onChange={handlePhotoChange}
            accept="image/*"
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="absolute bottom-0 bg-slate-400 text-white py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Upload image
        </div>
      </div>
      <div className=" w-full p-4"> 
      <p className='text-start  font-bold mb-2  mt-10'>Provide a brief description about the item:</p>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
      </div>

<div className="flex items-center justify-center">

      <button type="button" onClick={sendItemData} className=" text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Donate</button>
</div>
</form>

    </> 
  );
}

export default PhotoUpload;
