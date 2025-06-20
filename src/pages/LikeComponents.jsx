import React, { useEffect, useState } from "react";
import features from "../appwrite/features";
import authService from "../appwrite/auth";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const LikeComponents = ({ postId }) => {
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(false);

  const likeHandler = async () => {
    setloading(true);
    try {
      const getUser = await authService.getCurrentUser();
      if (!getUser) return;
      setUser(getUser);

      const posts = await features.getPostLike(postId);
      const userLike = posts.documents.find(
        (doc) => doc.userId === getUser.$id
      );
      setIsLike(!!userLike);
    } catch (error) {
      throw error
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    likeHandler();
  }, [postId]);

  const handleLike = async () => {
    if (!user) return;

    if (isLike) {
      await features.removePostLike(postId, user.$id);
      toast.error("liked removed");

    } else {
      await features.postLike(postId, user.$id);
      toast.success("post liked");
    }
    setIsLike(!isLike);
  };

  if (loading) return <p>loading...</p>;

  return (
    <div>
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer text-white transition ${
          isLike ? "bg-red-500" : "bg-gray-700 hover:bg-red-500"
        }`}
      >
        <FaHeart />
      </button>
    </div>
  );
};

export default LikeComponents;
