import { Client, Databases, ID } from "appwrite";
import conf from "../conf/conf";

export class Services {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.ProjectId);
    this.databases = new Databases(this.client);
  }

  createPost = async ({ title, content, image }) => {
    try {
      const sesssion = await this.databases.createDocument(
        conf.DatabaseId,
        conf.CollectionId,
        ID.unique(),
        {
          title,
          content,
          image,
        }
      );
      return sesssion;
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

  allpost = async () => {
    try {
      const session = await this.databases.listDocuments(
        conf.DatabaseId,
        conf.CollectionId
      );
      return session;
    } catch (error) {
      throw error;
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
