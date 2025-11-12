import { motion } from "framer-motion";

import banner1 from "../../assets/Atomic Habits.jpg";
import banner2 from "../../assets/Becoming.jpg";
import banner3 from "../../assets/Dune.jpg";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const Banner = () => {
  const images = [banner1, banner2, banner3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="bg-lightBg text-textPrimary py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
            Welcome to <span className="text-primary">The Book Haven</span>
          </h1>
          <p className="text-textSecondary max-w-md">
            Discover, read, and manage your favorite books in one elegant
            digital library. Explore collections or create your own bookshelf
            today.
          </p>

          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <Link
              to="/allBooks"
              className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-accent transition-all"
            >
              All Books
            </Link>
            <Link
              to="/addBooks"
              className="border border-primary text-primary px-6 py-2 rounded-md font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Create Book
            </Link>
          </div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          key={currentIndex} // important for animation on image change
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src={images[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 w-full lg:w-fit"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
