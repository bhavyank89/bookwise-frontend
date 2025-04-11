"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Star } from "lucide-react";
import LogoutUser from "./LogoutUser";

const books = [
    { title: "Origin", author: "Dan Brown", category: "Thriller / Mystery", image: "/origin-red.png" },
    { title: "The Fury", author: "Alex Michaelides", category: "Psychological Thriller", image: "/fury.png" },
    { title: "The Maidens", author: "Alex Michaelides", category: "Psychological Thriller", image: "/maidens.png" },
    { title: "Gerald’s Game", author: "Stephen King", category: "Horror Game", image: "/gerald.png" },
    { title: "Don’t Turn Around", author: "Jessica Barry", category: "Thriller / Suspense", image: "/dontturn.png" },
    { title: "Amazing Facts", author: "Jessica Barry", category: "Thriller / Suspense", image: "/facts.png" },
];

const Dashboard = () => {
    const [activeUser, setActiveUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:4000/fetchuser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token"),
                    },
                });
                const json = await response.json();
                setActiveUser(json);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <main className="min-h-screen text-white px-6 py-10 md:px-20">
            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <BookOpen size={28} /> BookWise
                </h1>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">Search</a>
                    <div className="flex items-center gap-2">
                        <div className="bg-white text-black font-semibold px-3 py-1 rounded-full">
                            {activeUser?.name ? activeUser.name[0]?.toUpperCase() : "U"}
                        </div>
                        <span className="font-medium">
                            {activeUser?.name || "User"}
                        </span>
                    </div>
                    <LogoutUser />
                </div>
            </header>

            {/* Featured Book Section */}
            <section className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
                <div className="max-w-xl">
                    <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                        Clément M
                    </span>
                    <h2 className="text-4xl font-bold mb-2">Origin</h2>
                    <p className="mb-2">
                        By <span className="text-[#d1a954] font-medium">Dan Brown</span> &nbsp;|&nbsp;
                        Category: <span className="text-[#d1a954] font-medium">Thriller / Suspense</span> &nbsp;|&nbsp;
                        <Star className="inline-block w-4 h-4 text-yellow-400" /> 4.5/5
                    </p>
                    <p className="text-sm mb-2">Total books: <strong>100</strong> &nbsp;&nbsp; Available books: <strong>42</strong></p>
                    <p className="text-gray-400 mb-4">
                        Origin is a 2017 mystery-thriller novel by American author Dan Brown...
                    </p>
                    <Button className="bg-[#f5c784] hover:bg-[#f1b65f] text-black font-semibold">
                        📖 Borrow Book Request
                    </Button>
                </div>

                {/* Book Image */}
                <div className="w-48 md:w-60 relative">
                    <img
                        src="/origin-blue.png"
                        alt="Origin Book Cover"
                        loading="lazy"
                        className="relative z-10 rounded-xl shadow-xl"
                    />
                    <img
                        src="/origin-blue.png"
                        alt=""
                        loading="lazy"
                        className="absolute top-6 left-6 blur-md opacity-30 z-0"
                    />
                </div>
            </section>

            {/* Popular Books */}
            <section>
                <h3 className="text-xl font-semibold mb-6">Popular Books</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {books.map((book, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={book.image}
                                alt={`Cover of ${book.title}`}
                                loading="lazy"
                                className="w-full h-40 object-cover rounded-md shadow"
                            />
                            <p className="mt-2 font-medium text-sm">{book.title} - By {book.author}</p>
                            <p className="text-gray-400 text-xs">{book.category}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
