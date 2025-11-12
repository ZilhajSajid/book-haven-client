import React from "react";
import { useLoaderData } from "react-router";

const BookDetails = () => {
  const book = useLoaderData();
  const { author, coverImage, genre, title, summary, rating } = book;

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white shadow-lg rounded-2xl flex flex-col lg:flex-row gap-8">
      {/* Left: Image */}
      <div className="flex justify-center lg:w-1/3">
        <img
          src={coverImage}
          alt={title}
          className="rounded-xl shadow-md w-full h-auto object-cover"
        />
      </div>

      {/* Right: Details */}
      <div className="flex flex-col justify-center space-y-4 lg:w-2/3">
        <h2 className="text-3xl font-bold text-primary">{title}</h2>
        <p className="text-gray-600">
          <span className="font-semibold text-textPrimary">Author:</span>{" "}
          {author}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold text-textPrimary">Genre:</span> {genre}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold text-textPrimary">Rating:</span> ⭐{" "}
          {rating}
        </p>
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
};

export default BookDetails;
