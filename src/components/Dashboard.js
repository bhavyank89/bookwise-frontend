"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Dashboard = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
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
                console.error("Error fetching books:", e.message);
            }
        };

        fetchBooks();
    }, []);

    const featuredBook = books.length > 0 ? books[0] : null;

    return (
        <main className="min-h-screen text-white px-6 py-10 md:px-20">
            {/* Featured Book Section */}
            {featuredBook && (
                <section className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
                    <div className="max-w-xl">
                        <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                            Featured Book
                        </span>
                        <h2 className="text-4xl font-bold mb-2">
                            {featuredBook.title || "Untitled"}
                        </h2>
                        <p className="mb-2">
                            By{" "}
                            <span className="text-[#d1a954] font-medium">
                                {featuredBook.author || "Unknown"}
                            </span>{" "}
                            &nbsp;|&nbsp; Category:{" "}
                            <span className="text-[#d1a954] font-medium">
                                {featuredBook.genre || featuredBook.category || "General"}
                            </span>{" "}
                            &nbsp;|&nbsp;
                            <Star className="inline-block w-4 h-4 text-yellow-400" /> 4.5/5
                        </p>
                        <p className="text-sm mb-2">
                            Total books: <strong>{featuredBook.count || 0}</strong> &nbsp;&nbsp;
                            Available: <strong>{featuredBook.available || 0}</strong>
                        </p>
                        <p className="text-gray-400 mb-4">
                            {featuredBook.summary || "No summary available."}
                        </p>
                        <Button className="bg-[#f5c784] hover:bg-[#f1b65f] text-black font-semibold">
                            📖 Borrow Book Request
                        </Button>
                    </div>

                    <div className="w-48 md:w-60 relative">
                        <img
                            src={featuredBook.image || "/origin-blue.png"}
                            alt={featuredBook.title || "Featured Book Cover"}
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

            {/* Popular Books Section */}
            <section>
                <h3 className="text-xl font-semibold mb-6">Popular Books</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {books.map((book, index) => (
                        <div key={book._id || index} className="text-center">
                            <img
                                src={book.image || "/fury.png"}
                                alt={`Cover of ${book.title || "book"}`}
                                loading="lazy"
                                className="w-full h-40 object-cover rounded-md shadow"
                            />
                            <p className="mt-2 font-medium text-sm truncate">
                                {book.title || "Untitled"} -{" "}
                                <span className="text-yellow-300">{book.author || "Unknown"}</span>
                            </p>
                            <p className="text-[#5e6475] text-xs">
                                {book.genre || book.category || "Uncategorized"}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
