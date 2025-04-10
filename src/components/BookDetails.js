"use client;"

import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Star } from "lucide-react";

const books = [
    { title: "Origin", author: "Dan Brown", category: "Thriller / Mystery", image: "/origin-red.png" },
    { title: "The Fury", author: "Alex Michaelides", category: "Psychological Thriller", image: "/fury.png" },
    { title: "The Maidens", author: "Alex Michaelides", category: "Psychological Thriller", image: "/maidens.png" },
    { title: "Gerald’s Game", author: "Stephen King", category: "Horror Game", image: "/gerald.png" },
    { title: "Don’t Turn Around", author: "Jessica Barry", category: "Thriller / Suspense", image: "/dontturn.png" },
    { title: "Amazing Facts", author: "Jessica Barry", category: "Thriller / Suspense", image: "/facts.png" },];

const BookDetails = () => {
    return (
        <main className="min-h-screen text-white px-6 py-10 md:px-20">

            {/* Header */}
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

            {/* Featured Book Section */}
            <section className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
                {/* Left Content */}
                <div className="max-w-xl">
                    <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">Clément M</span>
                    <h2 className="text-4xl font-bold mb-2">Origin</h2>
                    <p className="mb-2">
                        By <span className="text-[#d1a954] font-medium">Dan Brown</span> &nbsp;|&nbsp;
                        Category: <span className="text-[#d1a954] font-medium">Thriller / Suspense</span>
                        &nbsp;|&nbsp;
                        <Star className="inline-block w-4 h-4 text-yellow-400" /> 4.5/5
                    </p>
                    <p className="text-sm mb-2">Total books: <strong>100</strong> &nbsp;&nbsp; Available books: <strong>42</strong></p>
                    <p className="text-gray-400 mb-4">
                        Origin is a 2017 mystery-thriller novel by American author Dan Brown. It is the fifth installment in the
                        Robert Langdon series, following previous bestsellers such as The Da Vinci Code and Angels & Demons.
                    </p>
                    <Button className="bg-[#f5c784] hover:bg-[#f1b65f] text-black font-semibold">
                        📖 Borrow Book Request
                    </Button>
                </div>

                {/* Book Image */}
                <div className="w-48 md:w-60 relative">
                    <img src="/origin-blue.png" alt="Origin Book" className="relative z-10 rounded-xl shadow-xl" />
                    <img src="/origin-blue.png" alt="Blur" className="absolute top-6 left-6 blur-md opacity-30 z-0" />
                </div>
            </section>

            <div className="flex gap-4 justify-around items-center">
                <section className="lg:w-[70%]">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-6">Video</h3>
                        <video width="640" height="360" controls autoplay muted loop poster="thumbnail.jpg">
                            <source src="video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-6 justify-around">Summary</h3>
                        <p className="justify-around text-gray-400 mb-4">People in Glass Houses by Jayne Castle (a pseudonym for Jayne Ann Krentz) is a science fiction romance set in a future world where people with psychic abilities live in harmony with advanced technology. The story follows the main characters, Harriet and Sam, who are drawn together under unusual circumstances.</p>
                        <p className="justify-around text-gray-400 mb-4">Harriet, a talented psychic, works for a company that offers psychic services in a futuristic society. When she finds herself tangled in a dangerous situation involving a mysterious conspiracy, she enlists the help of Sam, a former investigator with a dark past. As they uncover the secrets surrounding a glass house—a mysterious structure tied to their investigation—they must navigate their growing attraction while facing hidden dangers.</p>
                        <p className="justify-around text-gray-400 mb-4">The novel combines elements of mystery, suspense, and romance, with a focus on psychic abilities, futuristic technology, and the complexities of relationships. The title, "People in Glass Houses," symbolizes the fragile nature of the world the characters inhabit and the vulnerabilities they face in their personal and professional lives.</p>

                    </div>
                </section>
                {/* Popular Books */}
                <section>
                    <h3 className="text-xl font-semibold mb-6">Popular Books</h3>
                    <div className="grid grid-cols-2 gap-6">
                        {books.map((book, index) => (
                            <div key={index} className="text-center">
                                <img src={book.image} alt={book.title} className="w-full h-40 object-cover rounded-md shadow" />
                                <p className="mt-2 font-medium text-sm">{book.title} - By {book.author}</p>
                                <p className="text-gray-400 text-xs">{book.category}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default BookDetails;
