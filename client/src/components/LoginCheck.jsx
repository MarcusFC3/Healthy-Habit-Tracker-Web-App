import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import isLoggedIn from "../hooks/account"

export default function LoginCheck() {
    if (!isLoggedIn) {
        <Navigate to="/login" />
    }
    <Outlet />
}