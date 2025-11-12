import React from "react";
import { motion } from "framer-motion";

const AboutBookHaven = () => {
  return (
    <section className="py-16 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            About <span className="text-accent">The Book Haven</span>
          </h2>
          <p className="text-textSecondary leading-relaxed text-sm sm:text-base md:text-lg">
            Welcome to <strong>The Book Haven</strong>, your elegant digital
            library where you can discover, read, and manage your favorite
            books. Explore curated collections, add your own books, and keep
            your personal bookshelf organized—all in one place.
          </p>
          <p className="text-textSecondary leading-relaxed text-sm sm:text-base md:text-lg">
            Whether you’re a casual reader or a book enthusiast, our platform
            helps you stay connected with the world of literature and share your
            love for books with others.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/GvXBvVdS/i-am-making-a-website-where-users-can-add-book-upd.png" // replace with your own image if you like
            alt="About The Book Haven"
            className="rounded-2xl shadow-lg w-72 sm:w-80 md:w-full max-w-sm md:max-w-md lg:max-w-lg object-cover transition duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBookHaven;
