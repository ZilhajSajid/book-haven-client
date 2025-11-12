import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section: Copyright */}
        <p className="text-sm text-center md:text-left">
          &copy; {currentYear} The Book Haven. All rights reserved.
        </p>

        {/* Right Section: Optional links */}
        <div className="flex gap-4">
          <a
            href="/allBooks"
            className="text-white hover:text-accent transition-colors text-sm"
          >
            All Books
          </a>
          <a
            href="/addBooks"
            className="text-white hover:text-accent transition-colors text-sm"
          >
            Add Book
          </a>
          <a
            href="/myBooks"
            className="text-white hover:text-accent transition-colors text-sm"
          >
            My Books
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
