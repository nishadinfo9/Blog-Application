import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import PostForm from "./components/PostForm";
import SingleBlog from "./pages/SingleBlog";
import Login from "./components/authenticantion/Login";
import Register from "./components/authenticantion/Register";
import { login, logout } from "./redux/authSlice";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import Protected from "./Protected";
import Profile from "./pages/Profile";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
    const loadUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        }
      } catch (error) {
        setError('Session check failed:', error.message)
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading)
    return <div className="text-center text-2xl mt-20">Loading...</div>;
  if (error)
    return <div className="text-center text-2xl mt-20">Loading...</div>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/blog/"
          element={
            <Protected>
              <PostForm />
            </Protected>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Protected>
              <PostForm />
            </Protected>
          }
        />
        <Route
          path="/post/:id"
          element={
            <Protected>
              <SingleBlog />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
      </Route>
    )
  );

  return (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );
};

export default App;
