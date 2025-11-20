import config from "./config";
import { Client, Storage, ID, Permission, Role } from "appwrite";

class StorageServices {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    this.bucket = new Storage(this.client);
  }

  uploadFile = async(file)=>{
    try {
      const fileupload = await this.bucket.createFile({
        bucketId:config.appwriteBucketid,
        fileId:ID.unique(),
        file:file

      });

      return fileupload;
    } catch (error) {
      console.log("problem in uploading file:: "+error);
      throw Error;
    }
  }


  deleteFile = async(fileid)=>{
    try {
      const deletefile= await this.bucket.deleteFile({
        bucketId:config.appwriteBucketid,
        fileId : fileid
      });

      return true;
    } catch (error) {
      console.log("problem in deleting file:: "+error);
      throw Error;
    }
  };

  getFile = (fileid)=>{
    try {
      const fileview =  this.bucket.getFileView({
        bucketId:config.appwriteBucketid,
        fileId:fileid,
      });
      return fileview;
    } catch (error) {
      console.log("problem in get file:: "+error);
      throw Error;
    }
  }
}

const storage = new StorageServices();
export default storage;
