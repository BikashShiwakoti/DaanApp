import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/dashboard';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import AddItem from './Components/AddItem';
import Edit from './Components/Edit';

function App() {

  return (
   
      <>
       
        <Routes>
          <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path="/dashboard" element={ <Dashboard />} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/additem' element={<AddItem/>}/> 
            <Route path='/edit' element={<Edit/>}/>
          </Routes>
      </>
   
  );
}

export default App;
