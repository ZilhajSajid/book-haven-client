import React from "react";
import Book from "../Book/Book";

const LatestBooks = ({ latestBooks }) => {
  //   console.log(latestBooks);

  return (
    <div>
      <h2 className="text-5xl text-center">
        Latest <span className="text-accent">Books</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {latestBooks.map((book) => (
          <Book key={book._id} book={book}></Book>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
