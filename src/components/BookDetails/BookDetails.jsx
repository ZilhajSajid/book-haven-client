import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);
  const { author, coverImage, genre, title, summary, rating, _id } = book;

  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // Check if book is already added
  useEffect(() => {
    if (!user?.email) return;
    const checkBookAdded = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/myBooks?email=${user.email}`
        );
        const added = res.data.some(
          (b) => b._id === _id || b.originalId === _id
        );
        setAlreadyAdded(added);
      } catch (err) {
        console.log(err);
      }
    };
    checkBookAdded();
  }, [user?.email, _id]);

  // Fetch comments for this book
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/comments?bookId=${_id}`
        );
        setComments(
          res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        ); // newest first
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
    const interval = setInterval(fetchComments, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, [_id]);

  const handleAddBook = async () => {
    if (!user?.email) {
      toast.error("Please log in first!");
      return;
    }

    if (alreadyAdded) {
      toast.error("You already added this book!");
      return;
    }

    const newBook = {
      originalId: _id,
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
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add book");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("Please log in to comment!");
      return;
    }
    if (!commentText.trim()) return;

    const newComment = {
      bookId: _id,
      name: user.displayName,
      photoURL: user.photoURL,
      comment: commentText.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/comments",
        newComment
      );
      if (res.data.insertedId) {
        setComments((prev) => [newComment, ...prev]); // add comment locally for instant update
        setCommentText("");
        toast.success("Comment added!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
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
        <p>
          <strong>Author:</strong> {author}
        </p>
        <p>
          <strong>Genre:</strong> {genre}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {rating}
        </p>
        <p>{summary}</p>

        <button
          onClick={handleAddBook}
          className="btn btn-primary w-40 mt-2"
          disabled={alreadyAdded}
        >
          {alreadyAdded ? "Already Added" : "Add Book"}
        </button>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Comments</h3>

          {user && (
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                className="textarea w-full mb-2"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="btn btn-sm btn-primary">
                Submit
              </button>
            </form>
          )}

          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {comments.map((c, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2 border rounded-lg"
                >
                  <img
                    src={c.photoURL}
                    alt={c.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p>{c.comment}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
