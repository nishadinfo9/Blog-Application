import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, actions) => {
      state.posts.unshift(actions.payload);
    },
    
    allPost: (state, actions) => {
      state.posts = actions.payload;
    },
    profilePost: (state, action)=>{
      state.posts = action.payload
    },
    updatePostInStore(state, action) {
      const updatedPost = action.payload;
      const index = state.posts.findIndex((p) => p.$id === updatedPost.$id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },
  },
});

export const { addPost, allPost, updatePostInStore, profilePost} = postSlice.actions;
export default postSlice.reducer;
