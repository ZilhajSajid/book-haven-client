import React from "react";
import { Link } from "react-router";

const Books = ({ book }) => {
  const { _id, title, author, genre, rating, coverImage } = book;
  return (
    <div className="card bg-base-100 w-96 shadow-sm hover:scale-105 transition ease-in-out mt-2">
      <figure className="px-10 pt-10">
        <img src={coverImage} alt="Books" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>Author: {author}</p>
        <p>Genre: {genre}</p>
        <p>Rating: {rating} ⭐</p>
        <div className="card-actions">
          <Link to={`/bookDetails/${_id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Books;
