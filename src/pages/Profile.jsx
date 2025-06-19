import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import services from "../appwrite/services";
import { useDispatch, useSelector } from "react-redux";
import { allPost, profilePost } from "../redux/postSlice";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const myPosts = useSelector((state)=>state.post.posts)

const profileHandler = async () => {
  setLoading(true);
  try {
    const getUser = await authService.getCurrentUser();
    setUser(getUser);

if (getUser?.$id) {
  const response = await services.allpost(getUser.$id);
  dispatch(profilePost(response.documents))
}

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    profileHandler();
  }, []);

  if (loading || !user) {
    return <p className="text-center text-white py-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-white">
      {/* Profile Header */}
      {user && (
        <div className="bg-neutral p-6 rounded-xl shadow-md text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">👤 {user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      )}

      {/* User's Posts */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">📝 Your Blog Posts</h3>
        {myPosts.length === 0 ? (
          <p className="text-gray-400">You haven’t posted anything yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {myPosts.map((post) => (
              <div key={post.$id} className="bg-gray-800 rounded-lg p-4 shadow">
                <h4 className="text-xl font-bold mb-2">{post.title}</h4>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <p className="text-gray-400 line-clamp-3">
                  {post.content.replace(/<[^>]+>/g, "")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
