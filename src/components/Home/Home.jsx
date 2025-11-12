import React, { useEffect, useState } from "react";
import Banner from "../Navbar/Banner";
import LatestBooks from "../LatestBooks/LatestBooks";
import axios from "axios";
import TopGenres from "../TopGenres/TopGenres";
import FeaturedBook from "../FeaturedBook/FeaturedBook";
import AboutBookHaven from "../AboutBookHeaven/AboutBookHeaven";

const Home = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/latest-books")
      .then((res) => {
        setLatestBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load latest Books");
        setLoading(false);
      });
  }, []);
  if (loading)
    return <span className="loading loading-spinner text-success"></span>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  return (
    <div>
      <Banner></Banner>
      <LatestBooks latestBooks={latestBooks}></LatestBooks>
      <TopGenres></TopGenres>
      <FeaturedBook></FeaturedBook>
      <AboutBookHaven></AboutBookHaven>
    </div>
  );
};

export default Home;
