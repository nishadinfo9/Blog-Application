import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Textaeria from "../reuseable/Textaeria";
import Button from "../reuseable/Button";
import features from "../appwrite/features";
import authService from "../appwrite/auth";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const CommentsCompo = ({ postId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const submited = async (data) => {
    if (!data) return;
    setSubmitting(true);
    try {
      await features.postComments({
        userId: user.$id,
        postId,
        text: data.message,
        charAt: new Date().toISOString(),
        username: user.name,
      });
      reset();
      handleComments();
      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleComments = async () => {
    setLoading(true);

    try {
      const commenstMsg = await features.getComments(postId);
      const sorted = commenstMsg.documents.sort(
        (a, b) => new Date(b.charAt) - new Date(a.charAt)
      );
      setMyComments(sorted);
      
    } catch (error) {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (error) {
      toast.error("Failed to get user");
    }
  };

  const deleteCommentsHandler = async (commentsId) => {
    if (!commentsId) return;

    try {
      await features.deleteComments(commentsId);
      setMyComments((prev) =>
        prev.filter((prevVal) => prevVal.$id !== commentsId)
      );
      toast.error("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    handleComments();
    getUser();
  }, [postId]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-white">Comments</h3>

      {/* Show comments */}
      {loading ? (
        <p className="text-gray-400">Loading comments...</p>
      ) : myComments.length === 0 ? (
        <p className="text-gray-400 mb-4">No comments yet. Be the first!</p>
      ) : (
        <ul className="mb-6 space-y-4 max-h-60 overflow-y-auto pr-2 ">
          {myComments &&
            myComments?.map((comment) => (
              <li
                key={comment.$id}
                className="bg-gray-800 p-3 rounded text-white relative"
              >
                <button
                  onClick={() => deleteCommentsHandler(comment.$id)}
                  className="absolute right-2 top-2 text-xl cursor-pointer text-red-500 hover:scale-110 transition"
                  title="Delete comment"
                >
                  <MdDelete />
                </button>

                <p className="text-base">{comment.text}</p>
                <small className="text-gray-400">
                  🧑 {comment.username} ·{" "}
                  {new Date(comment.charAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </small>
              </li>
            ))}
        </ul>
      )}

      <form onSubmit={handleSubmit(submited)} className="flex flex-col gap-2">
        <Textaeria
          placeholder="Write your comment..."
          rows={3}
          className="resize-none p-2 rounded bg-gray-700 text-white"
          {...register("message", { required: true })}
        />
        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
    </div>
  );
};

export default CommentsCompo;
