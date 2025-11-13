import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home/Home";
import AllBooks from "../components/AllBooks/AllBooks";
import Register from "../components/Register/Register";
import AddBooks from "../components/AddBooks/AddBooks";
import MyBooks from "../components/MyBooks/MyBooks";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import BookDetails from "../components/BookDetails/BookDetails";
import Login from "../components/Register/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allBooks",
        loader: () => fetch("http://localhost:3000/all-books"),
        element: <AllBooks></AllBooks>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/addBooks",
        element: (
          <PrivateRoute>
            <AddBooks></AddBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/myBooks",
        element: (
          <PrivateRoute>
            <MyBooks></MyBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/bookDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/all-books/${params.id}`),
        element: <BookDetails></BookDetails>,
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);
