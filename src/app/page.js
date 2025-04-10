"use client";

import Login from "@/components/Login";
import App from "@/components/App";
import Signup from "@/components/Signup";
import Dashboard from "@/components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookDetails from "@/components/BookDetails";
import SearchPage from "@/components/Search";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <Router>
      <div className="bg-[url('/background.jpg')] min-h-screen bg-cover bg-no-repeat">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookdetails" element={<BookDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}
