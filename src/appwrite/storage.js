import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class StorageConf {
  client = new Client();
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.ProjectId);
    this.bucket = new Storage(this.client);
  }

  uploadFile = async (fileId) => {
    try {
      return await this.bucket.createFile(conf.BucketId, ID.unique(), fileId);
    } catch (error) {
      throw error;
    }
  };

  getFileView = (fileId) => {
    return this.bucket.getFileView(conf.BucketId, fileId);
  };

}

export const storageConf = new StorageConf();
export default storageConf;
