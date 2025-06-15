import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import services from "../appwrite/services";
import { allPost } from "../redux/postSlice";
import ListPost from "../components/ListPost";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  // const navigate = useNavigate()npm

    //call store for all post
const post = useSelector((state) => state?.post?.posts) || []

  //call backend for all post
  useEffect(() => {
    const listHandler = async () => {
      setLoading(true)
      try {
        const userPost = await services.allpost();
        if (userPost) {
          dispatch(allPost(userPost.documents));
          // navigate()
        }
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
      
    };
    listHandler();
  }, [dispatch]);



  if (loading) return <p className="text-center text-2xl py-10">loading...</p>

  return (
    <>
      <ListPost posts={post} />
    </>
  );
};

export default Home;
