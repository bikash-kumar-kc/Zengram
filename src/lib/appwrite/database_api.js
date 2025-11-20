import config from "./config";
import { Client, ID, Query, TablesDB } from "appwrite";
import storage from "./storage";

class DatabaseServices {
 client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    this.database = new TablesDB(this.client);
  }

  // saving user information in db

  saveUserInfoToDB = async ({ accountId, email, name, imageUrl }) => {
    try {
      const userInfo = await this.database.createRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteUsercollectionid,
        rowId: ID.unique(),
        data: {
          accountId,
          name,
          email,
          imageUrl,
        },
      });

      if (!userInfo) throw error;

      return userInfo;
    } catch (error) {
      console.log("error from saving user to db:: " + error);
      throw error;
    }
  };

  // getting current user record...

  gettingcurrentuserrecord = async ({ accountId }) => {
    try {
      const response = await this.database.listRows({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteUsercollectionid,
        queries: [Query.equal("accountId", accountId)],
      });

      return response;

    } catch (error) {
      console.log("problem in getting current user:: " + error);
      throw error;
    }
  };

  // creating new post
  createNewPost = async ({ caption, location, tags, file, creator }) => {
    try {
      // uploading file
      const fileUpload = await storage.uploadFile(file);
      if (!fileUpload) {
        throw Error;
        return;
      }

      // get file url

      const fileUrl = storage.getFile(fileUpload.$id);

      if (!fileUrl) {
        await storage.deleteFile(fileUpload.$id);
        throw Error;
      }

      // convert tags into array
      tags = tags?.replace(/ /g, "").split(",") || [];

      const newPost = this.database.createRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwritePostcollectionid,
        rowId: ID.unique(),
        data: {
          creator: creator,
          location: location,
          tags: tags,
          imageUrl: fileUrl,
          imageId: fileUpload.$id,
          caption: caption,
        },
      });

      if (!newPost) {
        await storage.deleteFile(fileUpload.$id);
        throw Error;
      }

      return newPost;
    } catch (error) {
      console.log("problem in creating post:: " + error);
    }
  };

  // get recent post based on likes...

  getRecentPosts = async () => {
    try {
      const recentPosts = await this.database.listRows({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwritePostcollectionid,
        queries: [Query.orderDesc("$createdAt", Query.limit(20))],
      });
      return recentPosts;
    } catch (error) {
      console.log("error in getting recent posts:: " + error);
      throw Error
    }
  };

  // update likes array...

  updateLikeArray = async ({ postId, likearray }) => {
    try {
      const isupdate = this.database.updateRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwritePostcollectionid,
        rowId: postId,
        data: {
          likes: likearray,
        },
      });

      return isupdate;
    } catch (error) {
      console.log("problem in updating likes :: " + error);
      throw Error;
    }
  };

  // saves posts...

  savePosts = async ({ userId, postId }) => {
    try {
      const savePost = await this.database.createRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteSavescollectionid,
        rowId: ID.unique(),
        data: {
          userId: userId,
          postId: postId,
        },
      });

      return savePost;
    } catch (error) {
      console.log("Problem in saving posts:: " + error);
      throw Error;
    }
  };

  // deleting save post...

  deleteSavePost = async ({ savePostId }) => {
    try {
      const isdelete = await this.database.deleteRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteSavescollectionid,
        rowId: savePostId,
      });
      return isdelete;
    } catch (error) {
      console.log("problem in deleting save posts:: " + error);
      return false;
    }
  };

  // getting save post...

  getSavePost = async ({ userId }) => {
    try {
      const savepost = await this.database.listRows({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteSavescollectionid,
        queries: [Query.equal("userId", userId)],
      });
      return savepost;
    } catch (error) {
      console.log("Problem in getting save post:: " + error);
      throw Error;
    }
  };

  gettingUserById = async ({ userId }) => {
    try {
      const user = await this.database.getRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteUsercollectionid,
        rowId: userId,
      });
      return user;
    } catch (error) {
      console.log("problem in getting user by id:: " + error);
      throw Error;
    }
  };

  gettingPostById = async ({ postId }) => {
    try {
      
      const post = await this.database.getRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwritePostcollectionid,
        rowId: postId,
      });
      return post;
    } catch (error) {
      console.log("problem in getting post by id:: " + error);
      throw Error;
    }
  };

  updatingPost = async ({ caption, location, tags, file, creator, postId }) => {
    try {
      // uploading file

      const fileUpload = await storage.uploadFile(file);

      if (!fileUpload) {
        throw Error;
      }

      // get file url

      const fileUrl = storage.getFile(fileUpload.$id);

      if (!fileUrl) {
        await storage.deleteFile(fileUpload.$id);
        throw Error;
      }

      // convert tags into array
      tags = tags?.replace(/ /g, "").split(",") || [];

      const updatePost = this.database.updateRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwritePostcollectionid,
        rowId: postId,
        data: {
          caption: caption,
          location: location,
          tags: tags,
          imageUrl: fileUrl,
          imageId: fileUpload.$id,
          creator: creator,
        },
      });

      return updatePost;
    } catch (error) {
      console.log("problem in updating post:: " + error);
      throw Error;
    }
  };

  gettingAllPostsByUserId = async ({ creator }) => {
    try {
      const posts = await this.database.listRows({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwritePostcollectionid,
        queries: [Query.equal("creator", creator)],
      });
      return posts;
    } catch (error) {
      console.log("problem in getting posts by userId:: " + error);
      throw Error;
    }
  };

  getAllUsers = async () => {
    try {
      const allUsers = this.database.listRows({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteUsercollectionid,
      });
      return allUsers;
    } catch (error) {
      console.log("problem in getting all users:: " + error);
      throw Error;
    }
  };

  getInfinitePosts = async ({ pageParam }) => {
    const queries = [Query.orderDesc("$updatedAt"), Query.limit(5)];

    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }
    try {
      const infinitePosts = await this.database.listRows({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwritePostcollectionid,
        queries: queries,
      });

      if (!infinitePosts) throw Error;
      return infinitePosts;
    } catch (error) {
      console.log("problem in getting infinite posts:: " + error);
      throw Error;
    }
  };

  getSearchPosts = async (searchTerm ) => {
    try {
      const posts = await this.database.listRows({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwritePostcollectionid,
        queries: [Query.search("caption", searchTerm)],
      });

      if (!posts) throw Error;
      return posts;
    } catch (error) {
      console.log("problem in getting search posts:: " + error);
    }
  };

  deletingPost = async ({postId,imageId})=>{
    try {
      const isdelete = await this.database.deleteRow({
        databaseId:config.appwriteDatabaseid,
        tableId:config.appwritePostcollectionid,
        rowId:postId
            });

            if(!isdelete) throw Error;

            const fileDelete = await storage.deleteFile(imageId);

            if(!fileDelete) throw Error;
          
            return isdelete;

    } catch (error) {
      console.log("problem in deleting post:: "+error);
      throw Error;
    }
  }

  editProfile = async({userId,bio,userName})=>{
    try {
      const editProfile = this.database.updateRow({
        databaseId:config.appwriteDatabaseid,
        tableId:config.appwriteUsercollectionid,
        rowId:userId,
        data:{
          bio:bio,
          userName:userName,
        }
      });
      return editProfile;
    } catch (error) {
      console.log("problem in editing profile :: "+error);
      throw Error;
    }
  }
}

const databaseservices = new DatabaseServices();
export default databaseservices;
