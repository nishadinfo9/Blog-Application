import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import services from "../appwrite/services";
import { allPost } from "../redux/postSlice";
import parse from 'html-react-parser';

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => state.post.posts) || [];
  const filterd = post.find((item) => item.$id === id);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await services.deletePost(filterd.$id);
      dispatch(allPost());
      navigate("/");
      return;
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (!post?.length) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (!filterd) {
    return <div className="text-white text-center mt-20">Post not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* More Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <div className="dropdown dropdown-end">
          <button className="btn btn-sm btn-ghost text-xl text-white">
            <BiDotsVerticalRounded size={24} />
          </button>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
            <li>
              <button
                onClick={() => navigate(`/blog/${filterd.$id}`)}
                className="text-left hover:bg-white hover:text-black rounded"
              >
                ✏️ Edit
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="text-left hover:bg-white rounded text-red-500"
              >
                🗑️ Delete
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-white mb-6 sm:mb-8">
        {filterd.title}
      </h1>

      {/* Featured Image */}
      <div className="w-full h-60 sm:h-96 md:h-[500px] overflow-hidden rounded-xl shadow-lg mb-8 sm:mb-10">
        <img
          src={filterd.image}
          alt="Featured"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none text-white leading-relaxed">
        {parse(filterd.content)}
      </div>
    </div>
  );
};

export default SingleBlog;
