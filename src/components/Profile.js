"use client";

import { CalendarDays, Undo2, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const BorrowedBooksPage = () => {
    const [activeUser, setActiveUser] = useState({});
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:4000/fetchuser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token"),
                    },
                });
                const json = await res.json();
                setActiveUser(json);
                setBorrowedBooks(json.books || []);
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                console.error("Error fetching user:", err);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchUser();
    }, []);

    return (
        <main className="min-h-screen text-white px-8 py-10 font-sans">
            <div className="grid md:grid-cols-2 gap-10">
                {/* Left Card */}
                <div className="bg-[#1b1e2e] rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg">
                    {/* Skeleton Loader for Profile Section */}
                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            <div className="flex justify-center items-center space-x-4">
                                <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
                                <div className="flex flex-col space-y-2">
                                    <div className="w-32 h-4 bg-gray-700 rounded"></div>
                                    <div className="w-40 h-4 bg-gray-700 rounded"></div>
                                    <div className="w-24 h-4 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                            <div className="w-full h-48 bg-gray-700 rounded-lg"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 items-center text-center">
                            <div className="flex flex-col items-center">
                                <img
                                    src={activeUser?.avatar?.[0]?.path || "/fury.png"}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-[#2c3145]"
                                />
                                <p className="text-sm text-green-400 mt-2">
                                    {activeUser?.isVerified ? "✔ Verified Student" : "Verification Pending..."}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-sm text-gray-400 mt-1">
                                    <span className="font-semibold text-white mr-2">Name:</span> {activeUser?.name || "Student"}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    <span className="font-semibold text-white mr-2">Email ID:</span>{activeUser?.email || "example@student.com"}
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    <span className="font-semibold text-white mr-2">Student ID:</span> {activeUser?.uniId || "N/A"}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 w-full h-auto">
                        {/* Skeleton Loader for University ID */}
                        {loading ? (
                            <div className="w-full h-48 bg-gray-700 rounded-lg"></div>
                        ) : (
                            <img
                                src={activeUser?.uniIdDoc?.[0]?.path || "/fury.png"}
                                alt="University ID"
                                className="w-full h-[200px] rounded-xl object-cover border-2 border-[#2c3145]"
                            />
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Borrowed Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {loading ? (
                            // Skeleton loader for books list
                            <div className="grid gap-4">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#1b1e2e] rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 animate-pulse"
                                    >
                                        <div className="w-full h-48 bg-gray-700 rounded-lg mb-3"></div>
                                        <div className="w-1/2 h-4 bg-gray-700 rounded mb-2"></div>
                                        <div className="w-1/3 h-4 bg-gray-700 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        ) : borrowedBooks.length === 0 ? (
                            <p className="text-gray-400">No books borrowed yet.</p>
                        ) : (
                            borrowedBooks.map((book, index) => (
                                <div
                                    key={book._id || index}
                                    className="bg-[#1b1e2e] rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300"
                                >
                                    <img
                                        src={book.cover || "/origin-red.png"}
                                        alt={book.title}
                                        className="rounded-lg w-full h-48 object-cover mb-3"
                                    />
                                    <h3 className="font-semibold text-sm">{book.title || "Untitled"}</h3>
                                    <p className="text-xs text-gray-400">{book.category || "Unknown"}</p>
                                    <div className="mt-2 text-xs space-y-1 text-gray-300">
                                        <p className="flex items-center gap-1">
                                            <CalendarDays size={14} /> Borrowed on {book.date || "Unknown"}
                                        </p>
                                        {book.returned ? (
                                            <p className="flex items-center gap-1 text-green-400">
                                                <Undo2 size={14} /> Returned on {book.returned}
                                            </p>
                                        ) : book.overdue ? (
                                            <p className="flex items-center gap-1 text-red-400">
                                                <Clock size={14} /> Overdue Return
                                            </p>
                                        ) : book.due ? (
                                            <p className="flex items-center gap-1 text-yellow-400">
                                                <Clock size={14} /> Due on {book.due}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BorrowedBooksPage;
