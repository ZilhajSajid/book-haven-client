import React from "react";
import { Link } from "react-router";

const Book = ({ book }) => {
  const { _id, title, coverImage, summary, userEmail } = book;

  // Determine which route to use
  const detailsLink = userEmail
    ? `/myBooks/${_id}` // MyBooks collection
    : `/allBooks/${_id}`; // AllBooks collection

  return (
    <div className="card bg-base-100 w-96 shadow-sm hover:scale-105 transition ease-in-out mt-2">
      <figure className="px-10 pt-10">
        <img src={coverImage} alt="Books" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        {/* {userEmail && <h2 className="card-title">{userEmail}</h2>} */}
        <p>{summary}</p>
        <div className="card-actions">
          <Link to={detailsLink} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
