import {
    Route, Routes,
    BrowserRouter
  } from "react-router-dom";
import React from "react";

import registerAccount from "./hooks/account"

import Home from "./pages/home"
import Sign_Up from "./pages/sign_up"
import Layout from "./components/Layout"


const App = () =>{
    return (<div className="container">
    <BrowserRouter exact path="/">
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />}/>
                <Route path="home" element={<Home />}/>
                {/* <Route path="activities" element={<Activities />} /> */}
                {/* <Route path="leaderboards" element={<Leaderboard />} /> */}
                <Route path="sign_up" element={<Sign_Up registerAccount={registerAccount}/>} />
                {/* <Route path="login" element={<Login />} /> */}
            </Route>
        </Routes> 
    </BrowserRouter>
    </div>)
}

export default App;