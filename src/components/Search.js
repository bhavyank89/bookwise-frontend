"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // Add Skeleton import

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Loading state
    const itemsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true); // Set loading to true when fetching books
                const response = await fetch("http://localhost:4000/book/fetchall", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                setBooks(data.books || []);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false); // Set loading to false once fetch is done
            }
        };

        fetchBooks();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleBookClick = (book_id) => {
        navigate(`/bookDetails/${book_id}`, { state: { fromDashboard: true } });
    };


    const filteredBooks = books.filter((book) =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

    return (
        <main className="min-h-screen text-white px-6 py-10 md:px-20">
            <section className="min-h-screen px-4 md:px-8 py-12 text-white font-sans">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center justify-center text-center mb-10 space-y-2">
                        <h2 className="text-base text-gray-400 tracking-widest">
                            DISCOVER YOUR NEXT GREAT READ:
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-extrabold">
                            Explore and Search for <span className="text-yellow-400">Any Book</span> In Our Library
                        </h1>
                    </div>
                </div>

                {/* Search Input */}
                <div className="flex items-center gap-4 justify-center mt-6 mb-4 flex-wrap">
                    <div className="relative w-full max-w-xl">
                        <label htmlFor="search" className="sr-only">Search Books</label>
                        <Input
                            id="search"
                            className="bg-[#1f2333] border border-[#2f334a] text-white placeholder:text-gray-500 pl-12 py-6 rounded-xl"
                            placeholder="Search by title (e.g., Thriller, Mystery...)"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Search className="absolute left-4 top-4 text-gray-400" size={22} />
                    </div>
                </div>

                {/* Search result header */}
                {searchTerm && (
                    <div className="mt-10 text-xl font-medium text-center">
                        Search Results for <span className="text-yellow-400">{searchTerm}</span>
                    </div>
                )}

                {/* Books Grid */}
                {loading ? (
                    // Loading Skeleton
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 mt-8">
                        {[...Array(itemsPerPage)].map((_, index) => (
                            <div key={index} className="bg-[#1c1f2c] p-4 rounded-xl shadow-md">
                                <Skeleton height={192} className="rounded-lg mb-3" />
                                <Skeleton width="60%" height={24} className="mb-2" />
                                <Skeleton width="40%" height={20} />
                            </div>
                        ))}
                    </div>
                ) : paginatedBooks.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 mt-8">
                            {paginatedBooks.map((book) => (
                                <div
                                    onClick={() => handleBookClick(book._id)}
                                    key={book._id}
                                    className="bg-[#1c1f2c] p-4 rounded-xl hover:scale-105 transition-transform duration-200 shadow-md"
                                >
                                    <img
                                        src={book.thumbnailCloudinary?.secure_url || "/fury.png"} // Using Cloudinary thumbnail
                                        alt={book.title || "Book cover"}
                                        className="rounded-lg w-full object-cover h-48 mb-3"
                                    />
                                    <div className="text-sm font-semibold truncate">{book.title || "Untitled"}</div>
                                    <div className="text-xs text-gray-400">{book.genre || book.category || "Unknown Genre"}</div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-10 gap-3 flex-wrap">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    size="sm"
                                    variant={page === currentPage ? "default" : "ghost"}
                                    className={`rounded-lg px-4 py-2 ${page === currentPage
                                        ? "bg-yellow-400 text-black"
                                        : "bg-[#2a2d40] hover:bg-[#3a3e55] text-white"
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                    </>
                ) : (
                    // No Results Found
                    <div className="flex flex-col items-center justify-center mt-20 space-y-6">
                        <div className="bg-[#242837] p-6 rounded-full shadow-md">
                            <AlertCircle className="text-yellow-400" size={48} />
                        </div>
                        <h3 className="text-2xl font-bold">No Results Found</h3>
                        <p className="text-gray-400 text-sm max-w-sm text-center">
                            We couldn’t find any books matching your search. Try different keywords.
                        </p>
                        <Button
                            className="bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-2 rounded-xl"
                            onClick={() => setSearchTerm("")}
                        >
                            Clear Search
                        </Button>
                    </div>
                )}
            </section>
        </main>
    );
};

export default SearchPage;
