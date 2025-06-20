import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../redux/authSlice";
import profileIcon from "../../assets/profile.png";
import toast from "react-hot-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user); // Optional: if you store user

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
      toast.success('logout')
    } catch (error) {
      toast.error('logout failed')
      console.log("Logout error:", error);
    }
  };

  const navItem = [
    { name: "Home", slug: "/" },
    { name: "Post", slug: "/blog" },
  ];

  return (
    <nav className="bg-base-100 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-bold">
            📝 BLOG
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItem.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.slug)}
                className="text-md font-medium hover:text-orange-500"
              >
                {item.name}
              </button>
            ))}

            {/* Profile Icon */}
            {authStatus && (
              <button
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
                title="Profile"
              >
                <img
                  className="h-10 w-10 rounded-full border-2 border-orange-500"
                  src={profileIcon}
                  alt="Profile"
                />
              </button>
            )}

            {/* Auth Button */}
            {authStatus ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 cursor-pointer bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 cursor-pointer bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-3xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-4 pb-4 border-t pt-4">
            {navItem.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(item.slug);
                }}
                className="text-md font-medium hover:text-orange-500 text-left"
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/profile");
              }}
              className="flex items-center gap-2 text-md font-medium hover:text-orange-500"
            >
              <img
                src={profileIcon}
                className="h-8 w-8 rounded-full border"
                alt="Profile"
              />
              <span>Profile</span>
            </button>

            {authStatus ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition w-max"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
                className="px-5 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition w-max"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
