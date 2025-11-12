import React from "react";
import { useLoaderData } from "react-router";
import Books from "./Books";

const AllBooks = () => {
  const books = useLoaderData();
  const { author, coverImage, genre, title, summary, rating } = books;
  //   console.log(books);

  return (
    <div>
      <h2 className="text-5xl text-center">
        All <span className="text-accent">Books</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {books.map((book) => (
          <Books key={book._id} book={book}></Books>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
