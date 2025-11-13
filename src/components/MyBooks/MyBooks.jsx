import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's books
  useEffect(() => {
    if (!user?.email) return;

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/myBooks?email=${user.email}`
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user?.email]);

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/myBooks/${id}`
      );

      if (response.data.deletedCount > 0) {
        toast.success("Book deleted successfully!");
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== id && book.originalId !== id)
        );
      } else {
        toast.error("Failed to delete the book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Something went wrong!");
    }
  };

  // Update handler (navigate to update page)
  const handleUpdate = (id) => {
    navigate(`/updateBook/${id}`);
  };

  if (loading)
    return <p className="text-center mt-10">Loading your books...</p>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        My Books
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any books yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Cover</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Author</th>
                <th className="border px-4 py-2">Genre</th>
                <th className="border px-4 py-2">Rating</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="text-center">
                  <td className="border px-4 py-2">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="h-16 w-auto mx-auto rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{book.title}</td>
                  <td className="border px-4 py-2">{book.author}</td>
                  <td className="border px-4 py-2">{book.genre}</td>
                  <td className="border px-4 py-2">⭐ {book.rating}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleUpdate(book._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
