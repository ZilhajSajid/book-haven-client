import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateBook = () => {
  const { id } = useParams(); // Book _id
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    coverImage: "",
    rating: "",
    summary: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch the book details for pre-filled form
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/myBooks/${id}`);
        const data = res.data;
        setBook({
          title: data.title,
          author: data.author,
          genre: data.genre,
          coverImage: data.coverImage,
          rating: data.rating,
          summary: data.summary,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedBook = {
        ...book,
        rating: parseFloat(book.rating), // Convert rating to number
      };

      const res = await axios.put(
        `http://localhost:3000/myBooks/${id}`,
        updatedBook
      );

      if (res.data.success) {
        toast.success("✅ Book updated successfully!");
        navigate("/myBooks");
      } else {
        toast.error(res.data.message || "No changes were made");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading book...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="coverImage"
          value={book.coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="rating"
          value={book.rating}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="summary"
          value={book.summary}
          onChange={handleChange}
          placeholder="Summary"
          className="textarea textarea-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
