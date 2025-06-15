import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListPost = ({ posts }) => {
  const postList = Array.isArray(posts) ? posts : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        📰 Latest Blog Posts
      </h2>

      {postList.length === 0 ? (
        <p className="text-center text-gray-400">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {postList &&
            postList.map((post) => (
              <div
                key={post.$id}
                className="bg-neutral rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
              >
                {post.image && (
                  <img
                    src={post?.image}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-6 space-y-3 text-neutral-content">
                  <h3 className="text-2xl font-semibold text-orange-400">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 line-clamp-3">{post.content}</p>
                  <Link
                    to={`/post/${post.$id}`}
                    className="btn btn-sm btn-outline btn-accent mt-3"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ListPost;
