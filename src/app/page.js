"use client";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "@/components/Login";
import App from "@/components/App";
import Signup from "@/components/Signup";
import Dashboard from "@/components/Dashboard";
import BookDetails from "@/components/BookDetails";
import SearchPage from "@/components/Search";
import Profile from "@/components/Profile";
import Navbar from "@/components/Navbar";

function MainApp() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="bg-[url('/background.jpg')] min-h-screen bg-cover bg-no-repeat">
      {isLogin && <Navbar setIsLogin={setIsLogin}/>}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookdetails" element={<BookDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default function Home() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}
