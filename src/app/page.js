"use client";

import Login from "@/components/Login";
import App from "@/components/App";
import Signup from "@/components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Home() {
  return (
    <Router>
      <div className="bg-[url('/background.jpg')] min-h-screen bg-cover bg-no-repeat">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}
