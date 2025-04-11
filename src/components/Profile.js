"use client";

import { CalendarDays, Undo2, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const BorrowedBooksPage = () => {
    const [activeUser, setActiveUser] = useState({});
    const [borrowedBooks, setBorrowedBooks] = useState([]);

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
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <main className="min-h-screen bg-[#0f111c] text-white px-8 py-10 font-sans">
            <div className="grid md:grid-cols-2 gap-10">
                {/* Left Card */}
                <div className="bg-[#1b1e2e] rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="/fury.png"
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-4 border-[#2c3145]"
                        />
                        <div className="mt-3">
                            <p className="text-sm text-green-400">
                                {activeUser?.isVerified ? "✔ Verified Student" : "Verification Pending..."}
                            </p>
                            <h2 className="text-2xl font-semibold mt-1">
                                {activeUser?.name || "Student"}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {activeUser?.email || "example@student.com"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 text-sm space-y-2">
                        <p>
                            <span className="text-gray-400">University:</span>{" "}
                            {activeUser?.university || "N/A"}
                        </p>
                        <p>
                            <span className="text-gray-400">Student ID:</span>{" "}
                            {activeUser?.uniId || "N/A"}
                        </p>
                    </div>

                    <div className="mt-6 w-full h-auto">
                        {/* Optional: ID Card or extra info */}
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Borrowed Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {borrowedBooks.length === 0 ? (
                            <p className="text-gray-400">No books borrowed yet.</p>
                        ) : (
                            borrowedBooks.map((book, index) => (
                                <div
                                    key={book.id || index}
                                    className="bg-[#1b1e2e] rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300"
                                >
                                    <img
                                        src={book.cover || "/origin-red.png"}
                                        alt={book.title}
                                        className="rounded-lg w-full h-48 object-cover mb-3"
                                    />
                                    <h3 className="font-semibold text-sm">{book.title}</h3>
                                    <p className="text-xs text-gray-400">{book.category}</p>
                                    <div className="mt-2 text-xs space-y-1 text-gray-300">
                                        <p className="flex items-center gap-1">
                                            <CalendarDays size={14} /> Borrowed on{" "}
                                            {book.date || "Unknown"}
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
                                                <Clock size={14} /> {book.due}
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
