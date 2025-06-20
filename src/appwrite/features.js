import { Client, Databases, ID, Permission, Query, Role } from "appwrite";
import conf from "../conf/conf";

export class Features {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.ProjectId);
    this.databases = new Databases(this.client);
  }

  postLike = async (postId, userId) => {
    try {
      if (!userId) throw new Error("User ID is undefined");

      return await this.databases.createDocument(
        conf.DatabaseId,
        conf.LikesCollectionId,
        ID.unique(),
        {
          postId,
          userId,
        }
      );
    } catch (error) {
      console.error("❌ Error creating like:", error);
    }
  };

  getPostLike = async (postId) => {
    try {
      return await this.databases.listDocuments(
        conf.DatabaseId,
        conf.LikesCollectionId,
        [Query.equal("postId", postId)]
      );
    } catch (error) {
      console.error("❌ Error fetching likes:", error);
      return null;
    }
  };

  removePostLike = async (postId, userId) => {
    try {
      const session = await this.getPostLike(postId); // Get all likes for the post
      const userLike = session.documents.find((doc) => doc.userId === userId);

      if (userLike) {
        return await this.databases.deleteDocument(
          conf.DatabaseId,
          conf.LikesCollectionId,
          userLike.$id
        );
      } else {
        console.log("⚠️ No like found to remove for this user.");
      }
    } catch (error) {
      console.log("❌ Error removing like:", error);
    }
  };

  postComments = async ({ userId, postId, text, charAt, username }) => {
    try {
      return await this.databases.createDocument(
        conf.DatabaseId,
        conf.commentsCollectionId,
        ID.unique(),
        {
          userId,
          postId,
          text,
          charAt: new Date().toString(),
          username,
        }
      );
    } catch (error) {
      console.log("❌ Error creating comments:", error);
      return null;
    }
  };

  getComments = async (postId) => {
    try {
      return await this.databases.listDocuments(
        conf.DatabaseId,
        conf.commentsCollectionId,
        [Query.equal("postId", postId)]
      );
    } catch (error) {
      console.log("❌ Error creating listdocuments:", error);
      return null;
    }
  };

  deleteComments = async (commentsId) => {
   try {
      return await this.databases.deleteDocument(
        conf.DatabaseId,
        conf.commentsCollectionId,
        commentsId
      );
    } catch (error) {
      throw error;
    }
  };
}

export const features = new Features();
export default features;
