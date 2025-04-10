"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle, BookOpen } from "lucide-react";

const mockBooks = [
  { id: 1, title: "Origin - By Dan Brown", category: "Thriller / Mystery", cover: "/origin-red.png" },
  { id: 2, title: "The Fury - By Alex Michaelides", category: "Psychological Thriller", cover: "/fury.png" },
  { id: 3, title: "Angels and Demons", category: "Thriller", cover: "/origin-red.png" },
  { id: 4, title: "Inferno", category: "Adventure", cover: "/fury.png" },
  { id: 5, title: "Digital Fortress", category: "Tech Thriller", cover: "/origin-red.png" },
  { id: 6, title: "The Da Vinci Code", category: "Mystery", cover: "/fury.png" },
  { id: 7, title: "Deception Point", category: "Thriller", cover: "/origin-red.png" },
  { id: 8, title: "The Silent Patient", category: "Psychological Thriller", cover: "/fury.png" },
  // Add more books if needed
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered Books
  const filteredBooks = mockBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page on search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen text-white px-6 py-10 md:px-20">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen size={28} className="text-white" /> BookWise
        </h1>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Search</a>
          <div className="flex items-center gap-2">
            <div className="bg-white text-black font-semibold px-3 py-1 rounded-full">AH</div>
            <span>Adrian</span>
          </div>
          <button className="text-red-400 text-xl">🚪</button>
        </div>
      </header>

      <section className="min-h-screen px-4 md:px-8 py-12 text-white font-sans">
        {/* Title */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-10 space-y-2">
            <h2 className="text-base text-gray-400 tracking-widest">DISCOVER YOUR NEXT GREAT READ:</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Explore and Search for <span className="text-yellow-400">Any Book</span> In Our Library
            </h1>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="flex items-center gap-4 justify-center mt-6 mb-4 flex-wrap">
          <div className="relative w-full max-w-xl">
            <Input
              className="bg-[#1f2333] border border-[#2f334a] text-white placeholder:text-gray-500 pl-12 py-6 rounded-xl"
              placeholder="🔍 Thriller Mystery"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={22} />
          </div>
        </div>

        {/* Search Result Header */}
        {searchTerm && (
          <div className="mt-10 text-xl font-medium text-center">
            Search Results for <span className="text-yellow-400">{searchTerm}</span>
          </div>
        )}

        {/* Results */}
        {paginatedBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 mt-8">
              {paginatedBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-[#1c1f2c] p-4 rounded-xl hover:scale-105 transition-transform duration-200 shadow-md"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="rounded-lg w-full object-cover h-48 mb-3"
                  />
                  <div className="text-sm font-semibold">{book.title}</div>
                  <div className="text-xs text-gray-400">{book.category}</div>
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
                  className={`rounded-lg px-4 py-2 ${
                    page === currentPage ? "bg-yellow-400 text-black" : "bg-[#2a2d40] hover:bg-[#3a3e55] text-white"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
          </>
        ) : (
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
