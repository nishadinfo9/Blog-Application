import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import services from "../appwrite/services";
import { allPost } from "../redux/postSlice";
import parse from "html-react-parser";
import LikeComponents from "./LikeComponents";
import CommentsCompo from "./CommentsCompo";
import toast from "react-hot-toast";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await services.getPost(id);
        setPost(res);
      } catch (err) {
        toast.error("Post fetch failed:")
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {

    try {
      await services.deletePost(post.$id);
      dispatch(allPost());
      navigate("/");
      toast.success('post deleted')
      return;
    } catch (error) {
      toast.error('Delete failed')
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (!post) {
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
                onClick={() => navigate(`/blog/${post.$id}`)}
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

      <div>
        {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-white mb-6 sm:mb-8">
        {post.title}
      </h1>
      {/* Featured Image */}
      <div className="w-full h-60 sm:h-96 md:h-[500px] overflow-hidden rounded-xl shadow-lg mb-8 sm:mb-10">
        <img
          src={post.image}
          alt="Featured"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none text-white leading-relaxed">
        {parse(post.content)}
      </div>

{/* Like and Comments Components */}
      <div className="mt-6 flex flex-col gap-6">
        <LikeComponents postId={post.$id} />
        <CommentsCompo  postId={post.$id}/>
      </div>
      </div>
    </div>
  );
};

export default SingleBlog;
