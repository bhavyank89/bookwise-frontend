"use client";

import { BookOpen, CalendarDays, Undo2, Clock } from "lucide-react";

const borrowedBooks = [
    {
        id: 1,
        title: "The Origin - By Dan Brown",
        category: "Thriller / Mystery",
        date: "Dec 31",
        due: "04 days left to due",
        cover: "/origin-red.png",
        returned: false,
    },
    {
        id: 2,
        title: "The Fury - By Alex Michaelides",
        category: "Thriller / Mystery",
        date: "Dec 24",
        overdue: true,
        cover: "/fury.png",
        returned: false,
    },
    {
        id: 3,
        title: "The Origin - By Dan Brown",
        category: "Thriller / Mystery",
        date: "Jan 03",
        due: "04 days left to due",
        cover: "/origin-red.png",
        returned: false,
    },
    {
        id: 4,
        title: "Gerald's Game - By Stephen King",
        category: "Thriller / Mystery",
        date: "Dec 26",
        returned: "5th Jan",
        cover: "/gerald.png",
    },
];

const BorrowedBooksPage = () => {
    return (
        <main className="min-h-screen bg-[#0f111c] text-white px-8 py-10 font-sans">
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

            <div className="grid md:grid-cols-2 gap-10">
                {/* Left Card */}
                <div className="bg-[#1b1e2e] rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="/avatar.png"
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-4 border-[#2c3145]"
                        />
                        <div className="mt-3">
                            <p className="text-sm text-green-400">✔ Verified Student</p>
                            <h2 className="text-2xl font-semibold mt-1">Adrian</h2>
                            <p className="text-sm text-gray-400">contact@jsmastery.pro</p>
                        </div>
                    </div>

                    <div className="mt-6 text-sm space-y-2">
                        <p>
                            <span className="text-gray-400">University:</span> JS Mastery Pro
                        </p>
                        <p>
                            <span className="text-gray-400">Student ID:</span> 234567856
                        </p>
                    </div>

                    <div className="mt-6 w-full h-auto">
            // ID Card section
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Borrowed Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {borrowedBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-[#1b1e2e] rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300"
                            >
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="rounded-lg w-full h-48 object-cover mb-3"
                                />
                                <h3 className="font-semibold text-sm">{book.title}</h3>
                                <p className="text-xs text-gray-400">{book.category}</p>
                                <div className="mt-2 text-xs space-y-1 text-gray-300">
                                    <p className="flex items-center gap-1">
                                        <CalendarDays size={14} /> Borrowed on {book.date}
                                    </p>
                                    {book.returned ? (
                                        <p className="flex items-center gap-1 text-green-400">
                                            <Undo2 size={14} /> Returned on {book.returned}
                                        </p>
                                    ) : book.overdue ? (
                                        <p className="flex items-center gap-1 text-red-400">
                                            <Clock size={14} /> Overdue Return
                                        </p>
                                    ) : (
                                        <p className="flex items-center gap-1 text-yellow-400">
                                            <Clock size={14} /> {book.due}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BorrowedBooksPage;
