import React from 'react'
import cover from '../Images/cover.jpg';
import footerimage from '../Images/Cloth.jpg';
import gift from '../Images/gift.png';


const Body = () => {
    return (
        <>
            <div className='flex justify-center items-center flex-col mt-24  text-white'>
                <img className='h-96' src={cover} alt='cover' />
                <div className=' text-center mt-14 m-28'>
                    Extend the gift of access and abundance to those in need, graciously offering your surplus possessions without expectation of return. Embrace the beauty of generosity as you enrich the lives of others, sharing freely from the richness of your own.
                </div>
            </div>
            <div className='flex justify-around items-center text-white gap-3 text-center'>
                <div className='flex justify-center items-center flex-col'>

                    <img className='w-20 h-20 rounded' src={footerimage} alt='donating' />
                    <p>Add the item to donate<br/> you no longer use</p>
                </div>

                <div className='flex justify-center items-center flex-col'>

                    <img className='w-20 h-20 rounded' src={gift} alt='donating' />
                    <p>Get item if you need<br/>Contacting owner</p>
                </div>
            </div>

        </>
    )
}

export default Body