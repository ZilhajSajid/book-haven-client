import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6">404</h1>
      <p className="text-xl md:text-2xl text-textSecondary mb-4">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-sm md:text-base text-textSecondary mb-8">
        It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-accent transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
