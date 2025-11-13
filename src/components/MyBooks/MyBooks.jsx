import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/myBooks/${id}`
      );

      if (response.data.deletedCount > 0) {
        toast.success("Book deleted successfully!");
        setBooks(books.filter((book) => book._id !== id));
      } else {
        toast.error("Failed to delete the book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Something went wrong!");
    }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition relative"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="rounded-md h-60 w-full object-cover mb-3"
              />
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-sm text-gray-500 mt-1">Genre: {book.genre}</p>
              <p className="text-yellow-500 mt-2">⭐ {book.rating}</p>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(book._id)}
                className="btn btn-sm btn-error bg-primary border-0 text-white mt-3 w-full"
              >
                Delete Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
