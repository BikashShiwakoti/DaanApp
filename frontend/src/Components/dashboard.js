  import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const YourComponent = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemDataResponse = await fetch('http://localhost:4000/getItemData', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!itemDataResponse.ok) {
          console.log('Error fetching items');
          return;
        }

        const itemData = await itemDataResponse.json();
        setItems(itemData); // Update state with fetched data
        setLoading(false); // Update loading state after fetching data

      } catch (error) {
        setError(error.message || 'An error occurred while fetching profile data');
        setLoading(false); // Update loading state if there's an error
      }
    };
    
    fetchData();
  }, [accessToken, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  if (error) {
    return <div>{String(error)}</div>;
  }
  
  return (
    <div>
      <Navbar />
      <div  className='flex items-center justify-center gap-10 flex-wrap'>
        {items.map((item, index) => (
          <div key={index} className='h-auto w-80 flex items-center justify-center m-5 border-8 border-cyan-400 rounded-lg'>
            <div>
              <img  className='m-5 h-64 w-64' src={`data:${item.itemImageData.contentType};base64,${item.itemImageData.data}`} alt="Item" />
              <p className='text-center text-xl m-4 border-2 border-cyan-200'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
