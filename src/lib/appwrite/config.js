const config={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectid:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteUsercollectionid:String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
    appwriteBucketid:String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
    appwriteDatabaseid:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritePostcollectionid:String(import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID),
    appwriteSavescollectionid:String(import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID),
};  


export default config;