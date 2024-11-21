import {
    Route, Routes,
    BrowserRouter
  } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/home"
import Sign_Up from "./pages/sign_up"


const App = () =>{
    return (<div className="container">
    <BrowserRouter exact path="/home">
    <Navbar/>
        <Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/sign_up" element={<Sign_Up />} />
        </Routes> 
    </BrowserRouter>
    </div>)
}

export default App;