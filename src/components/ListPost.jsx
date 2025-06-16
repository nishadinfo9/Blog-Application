import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListPost = ({ posts }) => {
  const postList = Array.isArray(posts) ? posts : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-10">
        📰 Latest Blog Posts
      </h2>

      {postList.length === 0 ? (
        <p className="text-center text-gray-400">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {postList.map((post) => (
            <div
              key={post.$id}
              className="bg-neutral rounded-2xl overflow-hidden shadow-md hover:shadow-orange-500/40 transition-shadow duration-300 flex flex-col"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-neutral-content">
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-orange-400">
                    {post.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <Link
                  to={`/post/${post.$id}`}
                  className="btn btn-sm sm:btn-md btn-outline btn-accent mt-4 w-max"
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
