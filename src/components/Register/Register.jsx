import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Register = () => {
  const { createUser, signInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    return (
      password.length >= 6 &&
      uppercase.test(password) &&
      lowercase.test(password)
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    if (!name || !email || !password || !photoURL) {
      toast.error("Please fill all fields including photo URL!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters long and include uppercase and lowercase letters."
      );
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/users", {
        name,
        email,
        password,
        photoURL,
      });

      if (res.status === 201) {
        toast.success("Registration successful!");

        const userCredential = await createUser(email, password);
        const firebaseUser = userCredential.user;

        await firebaseUser.updateProfile({
          displayName: name,
          photoURL,
        });

        setUser(firebaseUser);

        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register user");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const googleUser = result.user;

      // Register or update user in backend
      await axios.post("http://localhost:3000/users", {
        name: googleUser.displayName,
        email: googleUser.email,
        photoURL: googleUser.photoURL,
      });

      // Auto-login
      setUser(googleUser);
      toast.success(`Welcome, ${googleUser.displayName}!`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl p-6">
      <h1 className="text-3xl text-center font-bold mb-4">Register now!</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 6 characters long and include uppercase
            and lowercase letters.
          </p>
        </div>

        <div>
          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            className="input input-bordered w-full"
            value={formData.photoURL}
            onChange={handleChange}
            placeholder="Profile Image URL"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full flex items-center justify-center gap-2"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default Register;
