import { Client, Databases, ID, Permission, Query, Role } from "appwrite";
import conf from "../conf/conf";

export class Services {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.ProjectId);
    this.databases = new Databases(this.client);
  }

  createPost = async ({ title, content, image, userId }) => {
    try {
      const response = await this.databases.createDocument(
        conf.DatabaseId,
        conf.CollectionId,
        ID.unique(),
        {
          title,
          content,
          image,
          userId, // 👈 add userId to the document
        },
        [
          Permission.read(Role.user(userId)), // 👈 only owner can read
          Permission.write(Role.user(userId)), // 👈 only owner can write
        ]
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  updatePost = async (slug, { title, content, image }) => {
    try {
      const session = await this.databases.updateDocument(
        conf.DatabaseId,
        conf.CollectionId,
        slug,
        {
          title,
          content,
          image,
        }
      );
      return session;
    } catch (error) {
      throw error;
    }
  };

  allpost = async (userId) => {
    try {
      const response = await this.databases.listDocuments(
        conf.DatabaseId,
        conf.CollectionId,
        [Query.equal("userId", userId)] // 👈 only fetch this user's posts
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  getPost = async (userId) => {
    try {
      return await this.databases.getDocument(
        conf.DatabaseId,
        conf.CollectionId,
        userId
      );
    } catch (error) {
      console.log(error);
    }
  };

  deletePost = async (slug) => {
    try {
      return await this.databases.deleteDocument(
        conf.DatabaseId,
        conf.CollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  };
}

export const services = new Services();
export default services;
