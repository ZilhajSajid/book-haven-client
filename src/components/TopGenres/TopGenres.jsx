import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const TopGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/all-books")
      .then((res) => setGenres(res.data))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  return (
    <section className="py-16 px-6 bg-base-200">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Top Genres
        </h2>
        <p className="text-gray-600 mt-3">
          Explore the most popular genres and find your next favorite book.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {genres.map((genre, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-xl overflow-hidden shadow-md cursor-pointer group"
          >
            <img
              src={genre.coverImage}
              alt={genre.title}
              className="h-40 w-full object-cover group-hover:opacity-90 transition"
            />
            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold">{genre.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopGenres;
