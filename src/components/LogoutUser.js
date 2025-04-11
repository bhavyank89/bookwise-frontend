"use client;"

import React from 'react'
import { LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';


function LogoutUser() {
    const navigate = useNavigate();

    const handleOnClick = () => {
        console.log("logout clicked");
        localStorage.removeItem('auth-token');
        navigate('/')
    }

    return (
        <>
            <button className="text-red-400 text-xl hover:cursor-pointer" onClick={handleOnClick}><LogOut /></button>
        </>
    )
}

export default LogoutUser
