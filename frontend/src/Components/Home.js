import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import Body from './body';
import Login from './Login';

function Home() {
  return (

    <>
    <div className='text-white text-center  '>
    <h1 className='text-4xl font-bold'>Daan</h1>
    <p>Let's share with each other</p>
    </div>
      <div className="absolute top-0 z-[-2] h-fit w-fit bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div class='grid items-center justify-center grid-rows-2 md:grid-cols-2 md:grid-rows-1'>

          <div  className='h-fit'>
            <Body />
          </div>
          <div className='h-fit bg-slate-900'>
            <Login />
          </div>
        </div>
        <Footer />
      </div>
    </>

  );
}

export default Home;
