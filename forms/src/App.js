import React,{useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // for handling page navigation
import './App.css';
import Navbar from './Components/navbar.jsx';
import LogIn from './Components/login';
import Register from './Components/register.jsx';
import Welcome from "./Components/welcome.jsx";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogOut = () =>{
    setLoggedIn(false);
    setUserEmail("");
  }

  return (
    <BrowserRouter>

    {!isLoggedIn && <Navbar />}

      <Routes>

        <Route path="/login" element=
        {isLoggedIn ? ( <Navigate to="/welcome" />) : (

          <LogIn  onLogInSuccess={(email) => {
            setLoggedIn(true);
            setUserEmail(email);
          }}/> )} 
        />

        <Route path="/register" element={
          isLoggedIn ? ( <Navigate to="/welcome" />) : (<Register />)} />


        
       <Route path= "/welcome" element = {
        isLoggedIn ? (<Welcome email={userEmail} onLogOut={handleLogOut}/>) : (<Navigate to="/login" />)
      } /> 

      <Route path="*" element = {
        <Navigate to = {isLoggedIn ? "/welcome" : "/login" } />
      }
      />

      </Routes>

    </BrowserRouter>
  );
}

export default App;