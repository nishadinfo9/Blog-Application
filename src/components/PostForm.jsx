import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../reuseable/Input";
import Textaeria from "../reuseable/Textaeria";
import Button from "../reuseable/Button";
import services from "../appwrite/services";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePostInStore } from "../redux/postSlice";
import storageConf from "../appwrite/storage";
import { useNavigate, useParams } from "react-router-dom";

const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [existingPost, setExistingPost] = useState({});

  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    if (id) {
      const postEdit = posts.find((post) => post.$id === id);
      if (postEdit) {
        setValue("title", postEdit.title);
        setValue("content", postEdit.content);
        // setValue("image", postEdit.image);
        setExistingPost(postEdit);
      }
    }
  }, [id, posts, setValue]);

  const submited = async (data) => {
    setLoading(true);
    if (!data) return; //data is not avabliable

    // POST EDIT
    if (id) {
      let EditImageURL = "";

      //image uploade
      if (data.image && data.image.length > 0) {
        const uploadEditImage = await storageConf.uploadFile(data?.image[0]);
        if (!uploadEditImage) return;
        EditImageURL = storageConf.getFileView(uploadEditImage.$id);
      }

      //create post
      const session = await services.updatePost(id, {
        title: data.title,
        content: data.content,
        image: EditImageURL || existingPost.image,
      });
      dispatch(updatePostInStore(session));
      navigate(`/post/${id}`);
      reset();

    } else {
      // POST CREATE

      //image uploade
      const uploadImage = await storageConf.uploadFile(data.image[0]);
      if (!uploadImage) return;
      const imageURL = storageConf.getFileView(uploadImage.$id);

      try {
        if (imageURL) {
          const session = await services.createPost({
            title: data.title,
            content: data.content,
            image: imageURL,
          });

          dispatch(addPost(session));
          navigate("/");
          reset();
        }
      } catch (error) {
        console.log(error);
        return null;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(submited)}
        className="w-full max-w-xl bg-neutral text-neutral-content p-10 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          📝 Create New Blog
        </h2>

        <div className="space-y-4">
          <Input
            label={"Title"}
            type={"text"}
            placeholder={"Enter your blog title"}
            {...register("title", { required: true })}
          />

          <Textaeria
            label={"Content"}
            placeholder={"Write your blog content here..."}
            {...register("content", { required: true })}
          />
          <Input
            type={"file"}
            accept="image/*"
            className={
              "file-input file-input-bordered w-full bg-gray-700 text-white"
            }
            label={"Upload Image"}
            {...register("image", { required: !id })}
          />

          {existingPost.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-400 mb-1">Current Image:</p>
              <img
                src={existingPost.image}
                alt="Current"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div className="pt-4">
          <Button type={"submit"}>{loading ? "Submiting" : "Submit"}</Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
