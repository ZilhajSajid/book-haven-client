import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddBooks = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const author = e.target.author.value;
    const email = e.target.email.value;
    const genre = e.target.genre.value;
    const rating = e.target.rating.value;
    const coverImage = e.target.coverImage.value;
    const summary = e.target.summary.value;

    if (!title || !author || !email || !genre || !rating || !coverImage) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newBook = {
      title,
      author,
      genre,
      rating: parseFloat(rating),
      coverImage,
      summary,
      userEmail: email,
    };

    try {
      const res = await axios.post(
        "https://book-haven-server-chi.vercel.app/myBooks",
        newBook
      );
      if (res.data.insertedId) {
        toast.success("Book added successfully!");
        navigate("/myBooks");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          Add a New Book
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="label font-medium">Book Title</label>
            <input
              type="text"
              className="input input-bordered"
              name="title"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium">Author Name</label>
            <input
              type="text"
              className="input input-bordered"
              name="author"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered bg-gray-100"
              name="email"
              readOnly
              defaultValue={user?.email}
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium">Genre</label>
            <input
              type="text"
              className="input input-bordered"
              name="genre"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium">Rating (1-5)</label>
            <input
              type="number"
              className="input input-bordered"
              name="rating"
              min={1}
              max={5}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium">Cover Image URL</label>
            <input
              type="text"
              className="input input-bordered"
              name="coverImage"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="label font-medium">Summary</label>
          <textarea
            className="input input-bordered h-24 resize-none"
            name="summary"
            placeholder="Short description..."
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
