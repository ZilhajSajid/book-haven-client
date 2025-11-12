import React from "react";
import { Link } from "react-router";

const Book = ({ book }) => {
  const { _id, title, coverImage, summary } = book;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={coverImage} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{summary}</p>
        <div className="card-actions">
          <Link to={`/bookDetails/${_id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
