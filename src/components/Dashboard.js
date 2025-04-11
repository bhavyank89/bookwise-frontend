"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Star } from "lucide-react";
import LogoutUser from "./LogoutUser";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [activeUser, setActiveUser] = useState({});
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

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
                fetchBooks();
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:4000/book/fetchall", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const json = await response.json();
                setBooks(json.book || []);
            } catch (e) {
                console.log("Error fetching books:", e.message);
            }
        };

        fetchUser();
    }, []);

    const featuredBook = books[0];

    return (
        <main className="min-h-screen text-white px-6 py-10 md:px-20">
            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <BookOpen size={28} /> BookWise
                </h1>
                <div className="flex items-center gap-6">
                    <Link to="/dashboard" className="hover:underline text-yellow-300">Home</Link>
                    <a href="#" className="hover:underline">Search</a>
                    <div className="flex items-center gap-2">
                        <div className="bg-white text-black font-semibold px-3 py-1 rounded-full">
                            {activeUser?.name ? activeUser.name[0]?.toUpperCase() : "U"}
                        </div>
                        <span className="font-medium">{activeUser?.name || "User"}</span>
                    </div>
                    <LogoutUser />
                </div>
            </header>

            {/* Featured Book Section */}
            {featuredBook && (
                <section className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
                    <div className="max-w-xl">
                        <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                            Featured Book
                        </span>
                        <h2 className="text-4xl font-bold mb-2">{featuredBook.title}</h2>
                        <p className="mb-2">
                            By <span className="text-[#d1a954] font-medium">{featuredBook.author}</span> &nbsp;|&nbsp;
                            Category: <span className="text-[#d1a954] font-medium">{featuredBook.genre || featuredBook.category}</span> &nbsp;|&nbsp;
                            <Star className="inline-block w-4 h-4 text-yellow-400" /> 4.5/5
                        </p>
                        <p className="text-sm mb-2">
                            Total books: <strong>{featuredBook.count}</strong> &nbsp;&nbsp;
                            Available books: <strong>{featuredBook.available}</strong>
                        </p>
                        <p className="text-gray-400 mb-4">{featuredBook.summary}</p>
                        <Button className="bg-[#f5c784] hover:bg-[#f1b65f] text-black font-semibold">
                            📖 Borrow Book Request
                        </Button>
                    </div>

                    <div className="w-48 md:w-60 relative">
                        <img
                            src={featuredBook.image || "/origin-blue.png"}
                            alt={featuredBook.title}
                            loading="lazy"
                            className="relative z-10 rounded-xl shadow-xl"
                        />
                        <img
                            src={featuredBook.image || "/origin-blue.png"}
                            alt=""
                            loading="lazy"
                            className="absolute top-6 left-6 blur-md opacity-30 z-0"
                        />
                    </div>
                </section>
            )}

            {/* Popular Books */}
            <section>
                <h3 className="text-xl font-semibold mb-6">Popular Books</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {books.map((book, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={book.image || "/fury.png"}
                                alt={`Cover of ${book.title}`}
                                loading="lazy"
                                className="w-full h-40 object-cover rounded-md shadow"
                            />
                            <p className="mt-2 font-medium text-sm">
                                {book.title} - By <span className="text-yellow-300">{book.author}</span>
                            </p>
                            <p className="text-[#5e6475] text-xs">{book.genre || book.category}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
