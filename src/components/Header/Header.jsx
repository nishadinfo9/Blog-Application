import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../redux/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user); // Optional: if you store user

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const navItem = [
    { name: "Home", slug: "/" },
    { name: "Post", slug: "/blog" },
  ];

  return (
    <nav className="flex items-center justify-between h-20 px-20 bg-base-100 shadow">
      <Link to="/" className="text-2xl font-bold">📝 BLOG</Link>
      <div className="flex items-center gap-10">
        {navItem.map((item) => (
          <button
            className="text-md font-medium hover:text-orange-500 cursor-pointer"
            onClick={() => navigate(item.slug)}
            key={item.name}
          >
            {item.name}
          </button>
        ))}

        {authStatus ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
