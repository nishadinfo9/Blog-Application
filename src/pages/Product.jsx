import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Textaeria from "../reuseable/Textaeria";
import Button from "../reuseable/Button";
import features from "../appwrite/features";
import authService from "../appwrite/auth";

const CommentsCompo = ({ postId }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const submited = async (data) => {
    if (!data) return;
    setSubmitting(true);
    try {
      const newcomments = await features.postComments(
        {userId: user.$id,
        postId,
        text: data.message,
        charAt: new Date().toISOString}
      );
      setMyComments((prev) => [newcomments, ...prev]);
      reset();
    } catch (error) {
      console.log("comments errors", error);
    } finally {
      submitting(false);
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (error) {
      console.log("user error", error);
    }
  };

  useEffect(() => {
    handleComments();
    getUser();
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-white">Comments</h3>

      {/* Show comments */}
      {loading ? (
        <p className="text-gray-400">Loading comments...</p>
      ) : myComments.length === 0 ? (
        <p className="text-gray-400 mb-4">No comments yet. Be the first!</p>
      ) : (
        <ul className="mb-6 space-y-4 max-h-60 overflow-y-auto pr-2">
          {myComments &&
            myComments.map((comment) => (
              <li
                key={comment.$id}
                className="bg-gray-800 p-3 rounded text-white"
              >
                <p className="text-base">{comment.text}</p>
                <small className="text-gray-400">🧑 {comment.userId}</small>
              </li>
            ))}
        </ul>
      )}

      <form onSubmit={handleSubmit(submited)} className="flex flex-col gap-2">
        <Textaeria
          value={text}
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
