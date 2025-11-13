import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Books from "./Books";

const AllBooks = () => {
  const booksData = useLoaderData(); // original books from loader
  const [books, setBooks] = useState(booksData);
  const [sortOrder, setSortOrder] = useState(""); // "" | "asc" | "desc"

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedBooks = [...booksData].sort((a, b) => {
      if (order === "asc") return a.rating - b.rating;
      if (order === "desc") return b.rating - a.rating;
      return 0;
    });
    setBooks(sortedBooks);
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h2 className="text-5xl text-center mb-6">
        All <span className="text-accent">Books</span>
      </h2>

      {/* Sorting Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handleSort("asc")}
        >
          Sort by Rating: Low → High
        </button>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handleSort("desc")}
        >
          Sort by Rating: High → Low
        </button>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handleSort("")}
        >
          Reset
        </button>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {books.map((book) => (
          <Books key={book._id} book={book}></Books>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
