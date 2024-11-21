import {
    Route, Routes,
    BrowserRouter
  } from "react-router-dom";
import React from "react";
import Home from "./pages/home"
import Sign_Up from "./pages/sign_up"
import Layout from "./components/Layout"


const App = () =>{
    return (<div className="container">
    <BrowserRouter exact path="/">
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />}/>
                {/* <Route path="/activities" element={<Activities />} /> */}
                {/* <Route path="/leaderboards" element={<Leaderboard />} /> */}
                <Route path="/sign_up" element={<Sign_Up />} />
                {/* <Route path="/login" element={<Login />} /> */}
                
            </Route>
        </Routes> 
    </BrowserRouter>
    </div>)
}

export default App;