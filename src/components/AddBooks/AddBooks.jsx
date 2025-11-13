import { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AddBooks = () => {
  const { user } = use(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const genre = e.target.genre.value;
    const rating = e.target.rating.value;
    console.log(title, name, email, genre, rating, _id);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <label className="label">Book Title</label>
          <input type="text" className="input" name="title" />
          <label className="label">Author Name</label>
          <input type="text" className="input" name="name" />
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            name="email"
            readOnly
            defaultValue={user?.email}
          />
          <label className="label">Genre</label>
          <input type="text" className="input" name="genre" />
          <label className="label">Rating (1-5)</label>
          <input
            type="number"
            className="input"
            name="rating"
            min={1}
            max={5}
            required
          />
          <button className="btn btn-primary mt-4">Add Book</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddBooks;
