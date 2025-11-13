import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { author, coverImage, genre, title, summary, rating, _id } = book;

  const [alreadyAdded, setAlreadyAdded] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const checkBookAdded = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/myBooks?email=${user.email}`
        );

        const added = res.data.some((b) => b._id === _id);
        setAlreadyAdded(added);
      } catch (err) {
        console.log(err);
      }
    };

    checkBookAdded();
  }, [user?.email, _id]);

  const handleAddBook = async () => {
    if (!user?.email) {
      toast.error("Please log in first!");
      return;
    }

    if (alreadyAdded) {
      toast.error("You already added this book!");
      return;
    }

    // Copy all fields from the original book
    const newBook = {
      originalId: _id, // store the original all-books _id
      title,
      author,
      coverImage,
      genre,
      rating,
      summary,
      userEmail: user.email,
    };

    try {
      const res = await axios.post("http://localhost:3000/myBooks", newBook);
      if (res.data.insertedId) {
        toast.success("✅ Book added successfully!");
        setAlreadyAdded(true);
        navigate("/myBooks");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white shadow-lg rounded-2xl flex flex-col lg:flex-row gap-8">
      <div className="flex justify-center lg:w-1/3">
        <img
          src={coverImage}
          alt={title}
          className="rounded-xl shadow-md w-full h-auto object-cover"
        />
      </div>

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

        <div className="card-actions justify-end">
          <button
            onClick={handleAddBook}
            className="btn btn-primary"
            disabled={alreadyAdded}
          >
            {alreadyAdded ? "Already Added" : "Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
