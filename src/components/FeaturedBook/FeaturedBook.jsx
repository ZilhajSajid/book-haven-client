import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const FeaturedBook = () => {
  const [book, setBook] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/featured-books")
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!book)
    return (
      <div className="flex justify-center py-16 text-gray-500">
        Loading featured book...
      </div>
    );
  return (
    <section className="py-16 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left"
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="rounded-2xl shadow-lg hover:shadow-2xl w-72 sm:w-80 md:w-full max-w-sm md:max-w-md lg:max-w-lg object-cover transition duration-500"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 space-y-5 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            📘 Book of the Week
          </h2>
          <h3 className="text-2xl font-semibold">{book.title}</h3>
          <p className="text-gray-600 italic">by {book.author}</p>
          <p className="text-textSecondary leading-relaxed">{book.summary}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBook;
