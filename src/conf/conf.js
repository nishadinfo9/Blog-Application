const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  CollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  BucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  apiKey: String(import.meta.env.VITE_API_KEY),
  LikesCollectionId: (import.meta.env.VITE_LIKE_COLLECTION_ID),
  commentsCollectionId: (import.meta.env.VITE_COMMENTS_COLLECTION_ID)
};
export default conf;
